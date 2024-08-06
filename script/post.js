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
  const content = args.join(" ");
  if (!content) {
    api.sendMessage(`❌Invalid arguments.\nUsage: ${prefix}post [content/text/status update]\n(You can also add images by replying the images then execute ${prefix}post cmd.)`, threadID, messageID);
    return;
  }
  const editzz = await api.sendMessage(`⏳ Please wait...`, threadID, messageID);
  const attachment = [];
  if (event.type === "message_reply" && event.messageReply.attachments.length !== 0) {
    const a = event.messageReply.attachments.filter(attachment => attachment.type === "photo");
    for (const { url } of a) {
      attachment.push({
        photo:
        {
          url
        }
      });
    }
  }
  api.editMessage(`⏳Posting...`, editzz.messageID);
  api.createPost({
    body: `${content}`,
    attachment,
    tags: [admin[0]],
    baseState: 0
  }, (e1, e2) => {
  api.editMessage(`✅Post created successfully!\n» Post link: ${e1} | ${e2}`, editzz.messageID);
  });
}
};
