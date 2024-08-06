const axios = require('axios');
const fs = require('fs');

const config = {
  name: "welcomenotif",
  version: "1.0",
  credits: "Kenneth Aceberos",
  description: "Welcome greetings every new member of the group chat."
}
let enabled = true;

module.exports = {
  config,
  async run({
    api,
    event,
    args,
    Utils
  }) {
    enabled = !enabled;
    const send = msg => api.sendMessage(msg, event.threadID, event.messageID);
    send(`[EVENT] | ${Utils.firstBigLetter(config.name)} has been ${enabled ? "enabled" : "disabled"}.`);
  },
  async handleEvent({ api, event, Utils }) {
  if (event.logMessageType === "log:subscribe") {
    const addedParticipants = event.logMessageData.addedParticipants;
    const senderID = addedParticipants[0].userFbId;
    let name = await api.getUserInfo(senderID).then(info => info[senderID].name);
    const Idavatar = await api.getUserInfo(senderID).then(info => info[senderID].profileUrl);
    const groupInfo = await api.getThreadInfo(event.threadID);
    const memberCount = groupInfo.participantIDs.length;
    const memberCount_ = memberCount.toString().endsWith("1") ? `${memberCount}st` : (memberCount.toString().endsWith("2") ? `${memberCount}nd` : memberCount.toString().endsWith("3") ? `${memberCount}rd` : memberCount)
    let groupName = groupInfo.threadName || "this group"; // Ensure a fallback value
    if (name.length > 25) name = name.substring(0, 25 - 3) + '...';
    if (groupName.length > 25) groupName = groupName.substring(0, 25 - 3) + '...';
    
    try {
      const { data } = await axios.get(`${Utils.api_pc}/welcomecard`, {
        params: {
          background: groupInfo.imageSrc || "https://i.ibb.co/4YBNyvP/images-76.jpg",
          text1: `Hi ${name}`,
          text2: `Welcome to ${groupName}`,
          text3: `The ${memberCount_} member of the group!`,
          avatar: Idavatar || `https://btch.pages.dev/file/365fde0bdb9699be80746.jpg`
        },
        responseType: 'arraybuffer' });
      const filePath = './script/cache/welcome_image.jpg';
      fs.writeFileSync(filePath, Buffer.from(data));
      api.sendMessage({
        body: `Everyone welcome the new member ${name} to ${groupName}!`,
        attachment: fs.createReadStream(filePath)
      }, event.threadID, () => fs.unlinkSync(filePath));
    } catch (error) {
      api.sendMessage({
        body: `Everyone welcome the new member ${name} to ${groupName}!`
      }, event.threadID);
    }
  }
}
}