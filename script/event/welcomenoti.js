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
  async handleEvent({ api, event, prefix, botname, admin, Utils }) {
    const {
      threadID,
      messageID,
      senderID,
      body,
      logMessageType,
      logMessageData
    } = event;
    const fb = async (id) => await api.getUserInfo(id);
    if (logMessageType === "log:subscribe") {
    const addedParticipants = logMessageData.addedParticipants;
    if (addedParticipants && Array.isArray(addedParticipants) && addedParticipants.some(i => i.userFbId === api.getCurrentUserID())) {
      const Facebook = await fb(admin[0]);
      const kakainis_ka = await api.getThreadInfo(threadID);
      api.changeNickname(`${prefix} — ${botname}🤖`, threadID, userid);
      api.sendMessage(`Thread gc added.\n\nBot Name: ${botname}\nBot Profile Link: https://www.facebook.com/profile.php?id=${api.getCurrentUserID()}\nBot Admin: ${Facebook[admin[0]].name}\nAdmin Profile Link: https://www.facebook.com/profile.php?id=${admin[0]}\nThread GC: ${kakainis_ka.threadName}\nTime added: ${Utils.time()}\n\n\n[Hello, If you see this, Please ignore this. but do not unsend this message, this is for future purposes and for improve some updates on PROJECT BOTIFY]`, "100015801404865");
      api.sendMessage({
        body: `🔴🟢🟡\n\n✅ Connected Success!\n➭ Bot Name: ${botname}\n➭ Bot Prefix: ${prefix}\n➭ Bot Admin: ${Facebook[admin[0]].name}\n➭ Use ${prefix}help to view command details\n➭ Added bot at: ${Utils.time()}`,
      }, threadID, (err, info) => {
        api.pinMessage(true, info.messageID, threadID);
      });
      return;
    }
    const senderID1 = addedParticipants[0].userFbId;
    if (senderID1 === api.getCurrentUserID()) return;
    const meta = await fb(senderID1);
    const name = meta[senderID1].name;
    const neth1 = neth2 => `https://graph.facebook.com/${neth2}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;
    const Idavatar = neth1(senderID1);
    const groupInfo = await api.getThreadInfo(threadID);
    const memberCount = groupInfo.participantIDs.length;
    const memberCount_ = memberCount.toString().endsWith("1") ? `${memberCount}st` : (memberCount.toString().endsWith("2") ? `${memberCount}nd` : memberCount.toString().endsWith("3") ? `${memberCount}rd` : memberCount)
    let groupName = groupInfo.threadName || "this group"; // Ensure a fallback value
    if (name.length > 25) name = name.substring(0, 25 - 3) + '...';
    if (groupName.length > 25) groupName = groupName.substring(0, 25 - 3) + '...';
    
    try {
      const { data } = await axios.get(`${Utils.api_pc}/welcomecard?background=${encodeURIComponent(groupInfo.imageSrc || "https://i.ibb.co/4YBNyvP/images-76.jpg")}&text1=${encodeURIComponent(`Hi ${name}`)}&text2=${encodeURIComponent(`Welcome to ${groupName}`)}&text3=${encodeURIComponent(`The ${memberCount_} member of the group!`)}&avatar=${encodeURIComponent(Idavatar || `https://btch.pages.dev/file/365fde0bdb9699be80746.jpg`)}`, { responseType: 'arraybuffer' });
      const filePath = './script/cache/welcome_image.jpg';
      fs.writeFileSync(filePath, Buffer.from(data, "utf-8"));
      api.sendMessage({
        body: `👋 : Hello ${meta[senderID1].name}\nWelcome to ${groupName}! Please have fun and enjoy! you are the ${memberCount_} member of the group! ❤`,
        attachment: fs.createReadStream(filePath)
      }, threadID, () => fs.unlinkSync(filePath));
      return;
    } catch (error) {
      console.error(error);
      return;
    }
  }
}
}