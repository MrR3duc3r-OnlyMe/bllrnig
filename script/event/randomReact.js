const tanginaka = require('node-emoji');
const config = {
  name: "randomReact",
  version: "1.0",
  credits: "Kenneth Aceberos",
  description: "Random emoji reacts to user's message."
};

let enabled = true;
module.exports = {
  config,
  parehas: true,
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
    prefix,
    admin,
    Utils
  }){
    if (event.body) {
      if (event.senderID === admin[0] ||
        event.senderID === api.getCurrentUserID() ||
        event.body.startsWith(prefix)) {
        return;
      }
      const tanginamoo = tanginaka.random();
      api.setMessageReaction(tanginamoo.emoji, event.messageID, () => {}, true);
    }
  }
};