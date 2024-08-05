module.exports.config = {
  name: "waifu",
  version: "1.0.0",
  role: 0,
  hasPrefix: true,
  credits: "Neth",
  description: "Waifu image. With NSFW",
  usages: "{p}waifu",
  cooldown: 0
};

module.exports.run = async ({ api, event, args, admin, Utils }) => {
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
  const path = __dirname + '/cache/' + `${timestamp}_Ughhhhhh.png`;

  api.setMessageReaction("⏳", event.messageID, () => {}, true);
    const fuck = nsfw ? 'neko1' : 'neko';

  const url = (await axios.get(`${Utils.api_josh}/${fuck}`, {
  responseType: 'arraybuffer'
  })).data;
  fs.writeFileSync(path, Buffer.from(url, "utf-8"));
  api.setMessageReaction("✅", event.messageID, () => {}, true);
  api.sendMessage({
    body: nsfw ? "Magjajabol nayan! 🥵" : "Waifu image 🧸",
    attachment: fs.createReadStream(path)
    }, threadID,
    () => {
    setTimeout(() => {
    fs.unlinkSync(path);
    }, 5*1000);
    }, messageID);
    } catch (error) {
      api.sendMessage(error.message, event.threadID, event.messageID);
    }
};
