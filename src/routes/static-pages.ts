import { router } from "../components/router";
import { DiscordCounts } from "../services/discord";

export function init() {
  router.get("/discord", async (ctx) => {
    const counter = new DiscordCounts();

    const memberCount = await counter.getMemberCount() || 0;
    const supporterCount = await counter.getSupporterCount() || 0;
    const builderCount = await counter.getBuilderCount() || 0;
    const coreCount = await counter.getCoreCount() || 0;

    // More to come
    ctx.body = {
      status: 'success',
      json: {members: memberCount, supporters: supporterCount, builders: builderCount, core: coreCount}
    };
  });
}
