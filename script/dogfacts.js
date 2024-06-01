const axios = require('axios');
const main = require(__dirname.replace("/script", "") + '/index');


module.exports.config = {
  name: "dogfacts",
  role: 0,
  credits: "Neth",
  description: "Random dog facts",
  hasPrefix: true,
  cooldown: 1*1000,
  usages: "{p}dogfacts"
};

module.exports.run = async function({ api, event, args, prefix }) {
 
  api.setMessageReaction("⏳", event.messageID, () => {}, true);
  //api.sendMessage(`Creating & Generating Microsoft Acc...\n⏳ Please wait...`, event.threadID, event.messageID);

    axios.get(`${main.apiniJoshua}/dogfact`)
    .then(dat => { 
      api.setMessageReaction("✅", event.messageID, () => {}, true);
    const { fact } = dat.data;
      api.sendMessage(`🐕 | ${fact}`, event.threadID, event.messageID);
     // res.json(dat.data);
    })
    .catch(e => {
      console.error(e);
      api.setMessageReaction("🤷", event.messageID, () => {}, true);
      api.sendMessage("An error occurred. Maybe The Server limited so maybe you'll try again later.", event.threadID, () => {}, event.messageID);
    });
};


