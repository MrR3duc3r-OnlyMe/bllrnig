module.exports.config = {
  name: "sim",
  version: "1.0.0",
  role: 0,
  credits: "jerome",
  description: "Talk to sim",
  cooldown: 0,
  hasPrefix: true
};

module.exports.run = async function({ api, event, args, Utils }) {
  const axios = require("axios");
  let { messageID, threadID, senderID, body } = event;
  let tid = threadID, mid = messageID;
  const content = encodeURIComponent(args.join(" "));
  if (!args[0]) return api.sendMessage("Please type a message...", tid, mid);
  try {
    const res = await axios.get(`${Utils.api_mark69}/sim?q=${content}`);
    const respond = res.data.response;
    api.sendMessage(respond, tid, mid);
  } catch (error) {
    console.error(error);
    api.sendMessage("An error occurred while fetching the data.", tid, mid);
  }
};