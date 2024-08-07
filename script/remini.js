const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports.config = {
  name: "remini",
  version: "1.0.0",
  role: 0,
  credits: "chill",
  description: "Enhance an image",
  hasPrefix: true
};

module.exports.run = async function({ api, event, Utils }) {
  try {

    if (!event.messageReply || !event.messageReply.attachments || event.messageReply.attachments.length === 0) {
      return api.sendMessage("❌Please reply to an image with this command to enhance it.", event.threadID, event.messageID);
    }

    const attachment = event.messageReply.attachments[0];

    // mag procces lng pag may attachment
    if (attachment.type !== 'photo') {
      return api.sendMessage("❌Please reply to a valid image to enhance.", event.threadID, event.messageID);
    }

    const imageUrl = attachment.url;
    const apiUrl = `${Utils.api_kenlie}/reminibymarjhun?url=${encodeURIComponent(imageUrl)}`;

    api.sendMessage("Enhancing the image, please wait...", event.threadID, event.messageID);
    
    const response = await axios.get(apiUrl);
    const response1 = await axios.get(response.data.image_data, { responseType: 'arraybuffer' });
    const enhancedImagePath = path.join(__dirname, "cache", "enhancedImage.png");
    fs.writeFileSync(enhancedImagePath, Buffer.from(response.data, "utf-8"));
    api.sendMessage({
      body: "✅Here is your enhanced image:",
      attachment: fs.createReadStream(enhancedImagePath)
    }, event.threadID, () => {
      fs.unlinkSync(enhancedImagePath);
    }, event.messageID);

  } catch (error) {
    console.error('Error:', error);
    api.sendMessage("An error occurred while processing the request.", event.threadID);
  }
};