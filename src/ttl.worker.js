import { ChannelType } from "discord.js";

const GUILD_ID = process.env.GUILD_ID;
const TTL_MS =
  (Number(process.env.TTL_DAYS) || 7) * 24 * 60 * 60 * 1000;

export async function runTTL(client) {
  const now = Date.now();

  try {
    const guild = await client.guilds.fetch(GUILD_ID);
    const channels = await guild.channels.fetch();

    for (const [, channel] of channels) {
      if (
        channel.type !== ChannelType.GuildText &&
        channel.type !== ChannelType.GuildAnnouncement
      ) continue;

      let beforeId = null;

      while (true) {
        const messages = await channel.messages.fetch({
          limit: 100,
          before: beforeId ?? undefined,
        });

        if (messages.size === 0) break;

        const expired = messages.filter(
          msg => msg.deletable && now - msg.createdTimestamp > TTL_MS
        );

        if (expired.size > 0) {
          await channel.bulkDelete(expired, true);
        }

        beforeId = messages.last().id;
        if (messages.size < 100) break;
      }
    }
  } catch {
    // silent by design
  }
}