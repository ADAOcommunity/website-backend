import Koa from "koa";
import koaBody from "koa-body";
import KoaRouter from "koa-router";
import KoaStatic from "koa-static";
import KoaMount from "koa-mount";
import * as Boom from "@hapi/boom";
import path from "path";
import { captureException, PublicError } from "./sentry";
import compress from "koa-compress";

// Useless
export interface KoaState extends Koa.DefaultState {}

export interface KoaContext extends Koa.Context {
  state: KoaState;
}

export const koa = new Koa<KoaState, KoaContext>();
export const router = new KoaRouter<KoaState, KoaContext>({
  prefix: process.env.HTTP_URL_PREFIX,
});

koa.use(compress());
koa.use(
  koaBody({
    text: false,
    multipart: true,
    urlencoded: true,
    formidable: {
      keepExtensions: true,
    },
  })
);
koa.use(KoaMount("/", KoaStatic(path.join(__dirname, "../../static"))));

// Error catcher
koa.use(async (ctx, next) => {
  try {
    await next();

    // Handle non-200 HTTP replies
    if (ctx.status < 200 || ctx.status > 299) {
      ctx.body = {
        error: ctx.response.message,
        status: ctx.status,
        statusCode: ctx.status,
      }
    }
  } catch (e: unknown) {
    captureException(e, {});

    if (!Boom.isBoom(e) && !(e instanceof PublicError)) {
      console.error(e);
      e = Boom.internal();
      await outputError(ctx, e);
    } else if (e instanceof PublicError) {
      e = Boom.badRequest(e.message, e);
      await outputError(ctx, e);
    }
  }
});

async function outputError(
  ctx: Koa.ParameterizedContext<KoaState, KoaContext, any>,
  e: any
) {
  ctx.status = e.output.statusCode;
  ctx.body = {
    ...e.output.payload,
    status: ctx.status,
    statusCode: undefined
  }
}

koa.use(router.routes());
koa.use(router.allowedMethods());
