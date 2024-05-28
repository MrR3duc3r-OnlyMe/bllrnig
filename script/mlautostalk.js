const axios = require('axios');

module.exports.config = {
  name: "mlstalker",
  version: "1.0",
  credits: "Kenneth Aceberos",
  role: 0,
  hasPrefix: true,
  usage: '[userid] [serverid]',
  description: 'Stalk an ML Account.',
  cooldown: 5
};

module.exports.run = async function ({ api, event, args, admin }) {   
  if (!args[0]){
    api.sendMessage("Please enter a User ID and Server ID.", event.threadID, event.messageID);
    return;
  } else {
    const wait = await api.sendMessage(`Please Wait...`, event.threadID, event.messageID);
    
    api.setMessageReaction("⏱️", event.messageID, () => {}, true);

    const emel = await axios.get(`https://api.kenliejugarap.com/mobilelegendsv2?userid=${args[0]}&zoneid=${args[1]}`);
    if (emel.data.status){
    api.setMessageReaction("✅", event.messageID, () => {}, true);
    api.editMessage(`ML Stalker\n\nID: ${args[0]}\nServer: ${args[1]}\nName: ${emel.data.username}\n\n🤖PROJECT BOTIFY by Neth🤖`, wait.messageID);
  } else {
      api.setMessageReaction("❌", event.messageID, () => {}, true);
api.sendMessage("❌Something went wrong", event.threadID);
  }
  }
};