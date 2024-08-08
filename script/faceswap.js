const modules = [
  require("axios"),
  require("fs")
];
const config = {
  name: "faceswap",
  role: 0,
  credits: "Kenneth Aceberos",
  description: "Swap faces",
  usage: "Reply by 2 images.",
  hasPrefix: true
}
module.exports = {
    config,
    async run({ api, event }) {
      const attachments = event.messageReply.attachments.filter(attachment => attachment.type === "photo");
      if (event.type !== "message_reply" || !attachments.length >= 2) {
        return api.sendMessage(`❌Please reply to the 2 images you want to swap with.`, event.threadID, event.messageID);
      }
      const [sourceUrl, targetUrl] = attachments.map(attachment => attachment.url);
      const path = __dirname + `/cache/${event.senderID}-faceswap.png`;
      api.sendMessage(`🔮 Faceswapping your image...`, event.threadID, event.messageID);
        modules[0]
          .post(`https://api.prodia.com/v1/faceswap`,
          { sourceUrl,targetUrl }, {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'X-Prodia-Key': `d44c4a7c-edd8-4268-a26d-da40f694a5e7`
            }
          })
          .then(async(response) => {
            const _ = response.data.imageUrl;
            const _1 = await axios.get(_, {
              responseType: "arraybuffer"
            });
            modules[1].writeFileSync(path, Buffer.from(_1.data, "utf-8"));
            api.sendMessage({
              body: `🔮 Faceswap successful.`,
              attachment: modules[1].createReadStream(path)
            }, event.threadID, () => {
              modules[1].unlinkSync(path);
            }, event.messageID);
          })
          .catch(error => {
            console.error(error);
            return api.sendMessage(`❌An error occured.`, event.threadID);
          });
      }
    }