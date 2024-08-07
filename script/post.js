const config = {
  name: "post",
  version: "1.0.0",
  role: 2,
  credits: "Kenneth Aceberos",
  // Designed for AutoBot
  description: "Create a new post in acc bot",
};

module.exports = {
  config,
  async run ({ event, api, prefix, botname, admin, args, outro, Utils }){
  const {
    threadID,
    messageID,
    senderID
  } = event;
  const axios = require("axios");
  const fs = require("fs");
  const content = args.join(" ");
  if (!content) {
    api.sendMessage(`❌Invalid arguments.\nUsage: ${prefix}post [content/text/status update]\n(You can also add images by replying the images then execute ${prefix}post cmd.)`, threadID, messageID);
    return;
  }
  const editzz = await api.sendMessage(`⏳ Please wait...`, threadID, messageID);
  const attachment = [];
  const paths = [];
  if (event.type === "message_reply" && event.messageReply.attachments.length !== 0) {
    const a = event.messageReply.attachments.filter(attachment => attachment.type === "photo");
    for (const { url } of a) {
      const path = `${__dirname}/cache/${Date.now()}.png`;
      const img = await axios.get(url, {
        responseType: "arraybuffer"
      });
      fs.writeFileSync(path, Buffer.from(img.data, "utf-8"));
      attachment.push(fs.createReadStream(path));
      paths.push(path);
    }
  }
  api.editMessage(`⏳Posting...`, editzz.messageID);
  api.createPost({
    body: `${content}`,
    attachment,
    tags: [admin[0]],
    baseState: 0
  }, (e1, e2) => {
  api.editMessage(`${e1}\n${JSON.stringify(e2, null, 4)}`, editzz.messageID);
  for (const path of paths) {
    fs.unlinkSync(path);
  }
  });
}
};
