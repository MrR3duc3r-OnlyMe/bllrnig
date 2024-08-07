const axios = require('axios');
const fs = require('fs');

module.exports.config = {
    name: "coupledp",
    version: "1.0.0",
    hasPermission: 0,
    role: 0,
    credits: "Neth",
    description: "Generate Couple Dp",
    usePrefix: true,
    usages: "{p}coupledp",
    cooldowns: 0,
    aliases: ["cpdp", "couple", "jowa", "bfgf", "cdp", "pares", "magjowa", "pangprofile"]
};

const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
const path1 = __dirname + '/cache/' + `${timestamp}_Cdp1.png`;
const path2 = __dirname + '/cache/' + `${timestamp}_Cdp2.png`;


module.exports.run = async function ({ api, event, Utils }) {
    try {
      
      api.setMessageReaction("⏳", event.messageID, () => {}, true);
        const apiUrl = `${Utils.api_josh}/cdp`;

      const pogiko = await axios.get(apiUrl);
      
      const {
        one, two
      } = pogiko.data.result;
      
      const api1 = (await axios.get(one, {
        responseType: "arraybuffer",
      })).data;
      fs.writeFileSync(path1, Buffer.from(api1, "utf-8"));
      const api2 = (await axios.get(two, {
        responseType: "arraybuffer",
      })).data;
      fs.writeFileSync(path2, Buffer.from(api2, "utf-8"));

      api.setMessageReaction("✅", event.messageID, () => {}, true);
      api.sendMessage({
        body: `Couple Dp ✨`,
        attachment: [
          fs.createReadStream(path1),
          fs.createReadStream(path2)
        ]
      }, event.threadID, () => {
        fs.unlinkSync(path1);
        fs.unlinkSync(path2);
      }, event.messageID);
    } catch (error) {
        console.error(error);
        api.sendMessage("An error occurred while processing your request.", event.threadID);
    }
};
