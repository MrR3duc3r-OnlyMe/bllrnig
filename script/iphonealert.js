module.exports.config = {
  name: "iphonealert",
  version: "1.0.0",
  role: 0,
  hasPrefix: true,
  credits: "Neth",
  description: "Funny iphone alert.",
  usages: "{p}iphonealert [query]",
  cooldowns: 5,
  
};

module.exports.run = async ({ api, event, args, Utils, prefix}) => {
  const axios = require('axios');
  const fs = require('fs');
  try { 
  const {
  threadID,
  messageID
  } = event;
  const query = args.join(" ");
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const path = __dirname + '/cache/' + `${timestamp}_NETHisPOGI.png`;
  if (!query){
    return api.sendMessage(`Input Query First!\nExample: ${prefix}iphonealert hello neth`, threadID, messageID);
  }
  api.setMessageReaction("📱", event.messageID, () => {}, true);
  const url = (await axios.get(`${Utils.api_pc}/alert?text=${query}`, {
  responseType: 'arraybuffer'
  })).data;
  fs.writeFileSync(path, Buffer.from(url, "utf-8"));
  api.setMessageReaction("👌", event.messageID, () => {}, true);
  setTimeout(function() {
  api.sendMessage({
    body: "You got an iphone alert!!!",
    attachment: fs.createReadStream(path)
    }, threadID,
    () => {
    setTimeout(() => {
    fs.unlinkSync(path);
    }, 5*1000);
    }, messageID);
    }, 5*1000);
    } catch (error) {
      api.sendMessage(error.message, event.threadID, event.messageID);
    }
};
