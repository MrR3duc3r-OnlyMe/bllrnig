module.exports.config = {
  name: "poli",
  version: "1.0.0",
  role: 0,
  hasPrefix: true,
  credits: "Developer",
  description: "generate image from polination.",
  usages: "poli [promt]",
  cooldowns: 5,
  
};

module.exports.run = async ({ api, event, args }) => {
  const axios = require('axios');
  const fs = require('fs-extra');
  try { 
  const { threadID, messageID } = event;
  const query = args.join(" ");
  const time = new Date();
  const timestamp = time.toISOString().replace(/[:.]/g, "-");
  const path = __dirname + '/cache/' + `${timestamp}_tid.png`;
  if (!query) return api.sendMessage("Please provide your prompt.", threadID, messageID);
    api.sendMessage(`Generating your prompt ${query}...`, event.threadID, event.messageID);
  const poli = (await axios.get(`https://image.pollinations.ai/prompt/${query}`, {
    responseType: "arraybuffer",
  })).data;
  fs.writeFileSync(path, Buffer.from(poli, "utf-8"));
    api.sendMessage({
    body: `🤖 ${query}`,
    attachment: fs.createReadStream(path)
      
    }, threadID, () => fs.unlinkSync(path));
    } catch (error) {
      api.sendMessage(error.message, event.threadID, event.messageID);
    }
};
