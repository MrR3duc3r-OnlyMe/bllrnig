const axios = require('axios');
const fs = require('fs');
const name = "aimagine";

const ais = [];
fs.readdirSync(__dirname).forEach(name => {
  if (!name.startsWith("aimagine_")) return;
  ais.push((name.replace("aimagine_", "").replace(".js", "")).toLowerCase());
})
const config = {
    name,
    version: "1.0",
    role: 0,
    credits: "Kenneth Aceberos",
    description: `Text2Image AI. More AImagine cmds: ${ais.join(", ")}`,
    aliases: ["sdxl"]
};

module.exports = {
    config,
    async run ({ api, event, args, Utils }) {
    const prompt = args.join(' ').trim();
    if (!prompt) {
      return api.sendMessage("❓Please provide a prompt first.", event.threadID, event.messageID);
    }
    try {
      const userInput = encodeURIComponent(prompt);
      api.sendMessage(`${Utils.firstBigLetter(name)} is generating your prompt...\n💡: ${prompt}`, event.threadID, event.messageID);
      const path = __dirname + '/cache/' + `${new Date().toISOString().replace(/[:.]/g, "-")+event.senderID+name}.png`;
      const a = Utils.api_cfneth("@cf/stabilityai/stable-diffusion-xl-base-1.0", "", userInput, true);
      const api1 = (await axios.post(a[0], a[1], a[2])).data;
      fs.writeFileSync(path, Buffer.from(api1, "utf-8"));
      api.sendMessage({
        body: `🤖 ${prompt}`,
        attachment: fs.createReadStream(path) }, event.threadID, () => fs.unlinkSync(path), event.messageID);
    } catch (error) {
        console.error(error);
        api.sendMessage("❌An error occurred while processing your request.", event.threadID);
    }
}
};
