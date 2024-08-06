const config = {
  name: "accept",
  version: "1.0",
  role: 2,
  credits: "Kenneth Aceberos",
  description: "Accept a friend request on bot."
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
    const type = args[0];
    if (!type)
      return api.sendMessage(`Usage: ${prefix}accept [friend/message] [uid]`, event.threadID, event.messageID);
    const uid = args[1];
    if (!uid || isNaN(uid))
      return api.sendMessage(`Please enter a valid UID.`, event.threadID, event.messageID);
    if (type.toLowerCase() === "friend")
      api.handleFriendRequest(uid, true, async (err, info) => {
        if (err) return api.sendMessage(`❌ An error occured.`, event.threadID);
        return api.sendMessage(`${uid} accepted successful.`, event.threadID, event.messageID);
      });
    if (type.toLowerCase() === "message")
      api.handleMessageRequest(uid, true, async (err, info) => {
        if (err) return api.sendMessage(`❌ An error occured.`, event.threadID);
        return api.sendMessage(`${uid} accepted successful.`, event.threadID, event.messageID);
      });
  }
}