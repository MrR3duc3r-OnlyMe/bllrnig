module.exports.config = {
  name: "neko",
  version: "1.0.0",
  role: 0,
  hasPrefix: true,
  credits: "Neth",
  description: "Neko images, with NSFW on/off(admin only).",
  usages: "{p}neko [turn on/off nsfw]",
  cooldown: 0
};

module.exports.run = async ({ api, event, args, Utils}) => {
  const axios = require('axios');
  const fs = require('fs-extra');
  try { 
  const {
  threadID,
  messageID
  } = event;
  const nsfw = Utils.threads.get(`${threadID}_nsfw`);
  api.sendMessage('Finding waifu images...', threadID, messageID);
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const path = __dirname + '/cache/' + `${timestamp}_Ughhhhh.png`;
  
  api.setMessageReaction("⏳", event.messageID, () => {}, true);
  const fuck = nsfw ? 'neko1' : 'neko';
  const url = (await axios.get(`${Utils.api_josh}/${fuck}`, {
  responseType: 'arraybuffer'
  })).data;
  fs.writeFileSync(path, Buffer.from(url, "utf-8"));
  api.setMessageReaction("✅", event.messageID, () => {}, true);
  api.sendMessage({
    body: nsfw ? "Magjajabol nayan! 🥵" : "Neko image 🧸",
    attachment: fs.createReadStream(path)
    }, threadID,
    () => {
    setTimeout(() => {
    fs.unlinkSync(path);
    }, 5*1000);
    }, messageID);
    } catch (error) {
      console.error(error);
    api.sendMessage(error.message, event.threadID, event.messageID);
    }
};
