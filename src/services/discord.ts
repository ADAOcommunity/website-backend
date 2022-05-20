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

  if (guild) {
    var memberCount = guild.members.cache.filter(member => !member.user.bot).size;  
    return memberCount;
  }

  return 0;
}

client.login(process.env.BOT_TOKEN!);