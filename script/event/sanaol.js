module.exports.config = {
  name: "sanaol",
  version: "69",
  credits: "Kenneth Aceberos",
};

module.exports.handleEvent = async function ({ api, event, admin, prefix }) {   
  if (!event.body) return;
  if (event.body && event.body.toLowerCase().startsWith("sanaol" || "naol" || "sana all" || "naoll" || "hope all" || "sana ol" || "ol sana" || "olsana")) {
    if (event.senderID == admin[0] || event.senderID == api.getCurrentUserID() || event.body.startsWith(prefix)){
      return;
      }

    setTimeout(() => api.setMessageReaction("😭", event.messageID, async () => {
      const akolang = await api.getUserInfo(event.senderID);
      api.sendMessage(`(2), ${akolang[event.senderID].name.split(" ")[0]}!!! 😭`, event.threadID, event.messageID);
    }, true), 2*1000);
  }
};