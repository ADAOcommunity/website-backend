import { router } from "../components/router";
import { getMemberCount } from "../services/discord";

export function init() {
  router.get("/discord", async (ctx) => {
    const memberCount = await getMemberCount() || 0;

    // More to come
    ctx.body = {"normal": memberCount}
  });
}
