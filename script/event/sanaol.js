const config = {
  name: "sanaol",
  version: "69",
  credits: "Kenneth Aceberos",
  description: "Every 'sanaol', it will reply and will say (2)"
};

let enabled = true;
module.exports = {
  config,
  async run({
    api,
    event,
    args,
    Utils
  }) {
    enabled = !enabled;
    const send = msg => api.sendMessage(msg, event.threadID, event.messageID);
    send(`[EVENT] | ${Utils.firstBigLetter(config.name)} has been ${enabled ? "enabled" : "disabled"}.`);
  },
  async handleEvent({
    api,
    event,
    admin,
    prefix
  }) {
    const b =
    [
    "sanaol",
    "naol",
    "sana all",
    "naoll",
    "hope all",
    "sana ol",
    "ol sana",
    "olsana"
    ];
    if (!event.body || !enabled) return;
    const c = ok => event.body.toLowerCase().includes(ok);
    if (event.body && (c(b[0]) || c(b[1]) || c(b[2]) || c(b[3]) || c(b[4]) || c(b[5]) || c(b[6]) || c(b[7]))) {
      if (event.senderID == admin[0] || event.senderID == api.getCurrentUserID() || event.body.startsWith(prefix)) {
        return;
      }
      setTimeout(() => api.setMessageReaction("😭", event.messageID, async () => {
        const akolang = await api.getUserInfo(event.senderID);
        api.sendMessage(`(2), ${akolang[event.senderID].name.split(" ")[0]}!!! 😭`, event.threadID, event.messageID);
      }, true), 5000);
    }
  }
};