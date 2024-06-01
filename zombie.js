const axios = require('axios');
const fs = require('fs');
const main = require(__dirname.replace("/script", "") + '/index');

module.exports.config = {
    name: "zombie",
    version: "1.0.0",
    hasPermission: 0,
    role: 0,
    credits: "Neth",
    description: "Image Gen",
    usePrefix: true,
    commandCategory: "AI",
    usages: "[reply image]",
    cooldowns: 0
};

module.exports.run = async function ({ api, event, args, outro}) {
    if (event.type !== "message_reply" || event.messageReply.attachments.length === 0) {
    return api.sendMessage("Please reply with the photo!", event.threadID, event.messageID);
  }

    try {
      const userInput = encodeURIComponent(event.messageReply.attachments[0].url);

      api.setMessageReaction("⏳", event.messageID, () => {}, true);
      api.sendMessage("🤖 Please wait...", event.threadID, event.messageID);

        const apiUrl = `${main.samir}/zombie?imgurl=${userInput}`;

      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      const path = __dirname + '/cache/' + `${timestamp}_ZzzZ.png`;

      const api1 = (await axios.get(apiUrl, {
        responseType: "arraybuffer",
      })).data;
      fs.writeFileSync(path, Buffer.from(api1, "utf-8"));
      api.setMessageReaction("✅", event.messageID, () => {}, true);
      api.sendMessage({
        body: `${outro}`,
        attachment: fs.createReadStream(path) }, event.threadID, () => fs.unlinkSync(path), event.messageID);
    } catch (error) {
        console.error(error);
        api.sendMessage("An error occurred while processing your request.", event.threadID);
    }
};
