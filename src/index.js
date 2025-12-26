import { Client, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";
import { runTTL } from "./ttl.worker.js";

dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
  ],
  presence: {
    status: "idle",
  },
});

function getIntervalByGuildSize(memberCount) {
  if (memberCount <= 500) return 5;
  if (memberCount <= 2000) return 10;
  if (memberCount <= 5000) return 20;
  return 45;
}

client.once("clientReady", async () => {
  console.log(`Connected as: ${client.user.tag} online`);

  const guild = await client.guilds.fetch(process.env.GUILD_ID);

  const intervalMinutes = getIntervalByGuildSize(guild.memberCount);
  const intervalMs = intervalMinutes * 60 * 1000;

  // run once immediately (catch-up)
  await runTTL(client);

  // then continue normally
  setInterval(() => runTTL(client), intervalMs);
});

process.on("SIGINT", () => process.exit(0));
process.on("SIGTERM", () => process.exit(0));

client.login(process.env.TOKEN);