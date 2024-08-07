const config = {
  name: "restart",
  version: "1.0",
  aliases: ["reboot", "rb", "rs", "pull"],
  role: 3,
  description: "Restarts the bot, Also update new pull req for the server/bot updates. for superadmin only!",
};

module.exports = {
  config,
  async run({ api, event }) {
  const input = args.join(" ");
  try {
    api.sendMessage(`🤖 Project Botify server is restarting now.`, event.threadID, () => process.exit(1), event.messageID);
  } catch (error) {
    api.sendMessage(
      `${error.message}`,
      event.threadID, event.messageID
    );
  }
}
}