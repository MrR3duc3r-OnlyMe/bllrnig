const config = {
  name: "accept",
  version: "1.0",
  role: 2,
  credits: "Kenneth Aceberos",
  description: "Accept a message request on bot."
}

module.exports = {
  config,
  async run({
    api,
    event,
    args,
    Utils,
    prefix
  }) {
    const uid = args[0];
    if (!uid || isNaN(uid))
      return api.sendMessage(`Please enter a valid UID.\nUsage: ${prefix}accept [uid]`, event.threadID, event.messageID);
      api.handleMessageRequest(uid, true, async (err, info) => {
        if (err) return api.sendMessage(`❌ An error occured.\n${err}`, event.threadID);
        api.sendMessage(`😸 You are now approved!\nYou can now use the bot freely (don't spam/abuse the bot)`, uid);
        return api.sendMessage(`${uid} accepted successful.`, event.threadID, event.messageID);
      });
  }
}