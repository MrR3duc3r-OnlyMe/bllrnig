const config = {
  name: "setpfp",
  version: "1.0.0",
  role: 2,
  credits: "Kenneth Aceberos",
  description: "Change a profile picture in acc bot",
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
  if (event.type !== "message_reply") {
    api.sendMessage(`❌Invalid arguments.\nUsage: Replying the images then execute ${prefix}setpfp cmd.\n(You can also add caption. Optional)`, threadID, messageID);
    return;
  }
  const editzz = await api.sendMessage(`⏳ Please wait...`, threadID, messageID);
  const a = event.messageReply.attachments.filter(attachment => attachment.type === "photo");
  const path = `${__dirname}/cache/pfp${Date.now()}.png`;
  const img = await axios.get(a[0].url, {
    responseType: "arraybuffer"
  });
  fs.writeFileSync(path, Buffer.from(img.data, "utf-8"));
  api.editMessage(`⏳ Changing profile picture..`, editzz.messageID);
  api.changeAvatar(fs.createReadStream(path), `${args.join(" ")}`, null, (e1, e2) => {
  api.editMessage(`${e1}\n${JSON.stringify(e2, null, 4)}`, editzz.messageID);
  fs.unlinkSync(path);
  });
}
};
