const tanginaka = require('node-emoji');

module.exports.config = {
  name: "randomReact",
  version: "69",
  credits: "Kenneth Aceberos",
  description: "Random emoji reacts to user's message."
};

module.exports.handleEvent = async function ({ api, event, admin, prefix }) {   
  if (event.body) {
    if (event.senderID == admin[0] || event.senderID == api.getCurrentUserID() || event.body.startsWith(prefix)){
    return;
    }
    const tanginamoo = tanginaka.random();
  // const yawaa = JSON.stringify(tanginamoo);
  //  const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
      setTimeout(() => api.setMessageReaction(tanginamoo.emoji, event.messageID, () => {}, true),2*1000);
  }
};