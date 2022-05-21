// Load dependencies
import Discord from 'discord.js';
import "dotenv"

const allIntents = new Discord.Intents(32767);

const client = new Discord.Client({
  intents: [allIntents, Discord.Intents.FLAGS.GUILD_MEMBERS],
  partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});

export async function getMemberCount() {
  await client.guilds.fetch();
  const guild = client.guilds.cache.get("881538386857451560");

  var memberCount = 0;
  var supporterCount = 0;
  var builderCount = 0;
  var coreCount = 0;

  if (guild) {
    const supporterRole = guild.roles.cache.get('895709292030738463');
    const builderRole = guild.roles.cache.get('895709326549864539');
    const coreRole = guild.roles.cache.get('922671359585292308');

    if (supporterRole && builderRole && coreRole) {
      memberCount = guild.members.cache.filter(member => !member.user.bot).size;
      supporterCount = supporterRole.members.map(m=>m.user.tag).length;
      builderCount = builderRole.members.map(m=>m.user.tag).length;
      coreCount = coreRole.members.map(m=>m.user.tag).length;
    }
  }

  return {members: memberCount, supporters: supporterCount, builders: builderCount, core: coreCount};
}

client.login(process.env.BOT_TOKEN!);