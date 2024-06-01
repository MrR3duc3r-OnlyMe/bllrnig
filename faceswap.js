const axios = require('axios');
const fs = require('fs');
const main = require(__dirname.replace("/script", "") + '/index');

module.exports.config = {
    name: "faceswap",
    version: "1.0.0",
    hasPermission: 0,
    role: 0,
    credits: "Neth",
    description: "Image Gen",
    usePrefix: true,
    commandCategory: "AI",
    usages: "[reply 2 images]",
    cooldowns: 0
};

module.exports.run = async function ({ api, event, args, outro}) {
    if (event.type !== "message_reply" || event.messageReply.attachments.length === 0) {
    return api.sendMessage("Please reply with the two photos!", event.threadID, event.messageID);
  }

    try {
      const userInput = encodeURIComponent(event.messageReply.attachments[0].url);
      const userInput1 = encodeURIComponent(event.messageReply.attachments[1].url);

      api.setMessageReaction("⏳", event.messageID, () => {}, true);
      api.sendMessage("🤖 Please wait...", event.threadID, event.messageID);

        const apiUrl = `${main.samir}/faceSwap?sourceUrl=${userInput}&targetUrl=${userInput1}`;

      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      const path = __dirname + '/cache/' + `${timestamp}_FaceSwapp.png`;

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
