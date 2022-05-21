// Load dependencies
import Discord from 'discord.js';
import "dotenv"

const allIntents = new Discord.Intents(32767);

const client = new Discord.Client({
  intents: [allIntents, Discord.Intents.FLAGS.GUILD_MEMBERS],
  partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});

client.login(process.env.BOT_TOKEN!);

export class DiscordCounts {
  guild: Discord.Guild | undefined;

  constructor () {
    client.guilds.fetch();
    this.guild = client.guilds.cache.get("881538386857451560");
  }

  async getMemberCount() {

    var memberCount = 0;

    if (this.guild) {
      memberCount = this.guild.members.cache.filter(member => !member.user.bot).size;
    }

    return memberCount;
  }

  async getSupporterCount() {
    var supporterCount = 0;

    if (this.guild) {
      const supporterRole = this.guild.roles.cache.get('895709292030738463');

      if (supporterRole) {
        supporterCount = supporterRole.members.map(m=>m.user.tag).length;
      }
    }

    return supporterCount;
  }

  async getBuilderCount() {
    var builderCount = 0;

    if (this.guild) {
      const builderRole = this.guild.roles.cache.get('895709326549864539');

      if (builderRole) {
        builderCount = builderRole.members.map(m=>m.user.tag).length;
      }
    }

    return builderCount;
  }

  async getCoreCount() {
    var coreCount = 0;

    if (this.guild) {
      const coreRole = this.guild.roles.cache.get('922671359585292308');

      if (coreRole) {
        coreCount = coreRole.members.map(m=>m.user.tag).length;
      }
    }

    return coreCount;
  }
}