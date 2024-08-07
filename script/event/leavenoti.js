const axios = require('axios');
const fs = require('fs');

const config = {
  name: "leavenotif",
  version: "1.0",
  credits: "Kenneth Aceberos",
  description: "Leave greetings every member left from the group chat."
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
  async handleEvent({ api, event, botname, prefix, botname, admin, Utils }) {
    const {
      threadID,
      messageID,
      senderID,
      body,
      logMessageType,
      logMessageData,
      author
    } = event;
    if (!body && logMessageType === "log:unsubscribe") {
      api.getThreadInfo(threadID).then(({ participantIDs }) => {
        let leaverID = logMessageData.leftParticipantFbId;
        api.getUserInfo(leaverID, (err, userInfo) => {
          if (err) {
            return console.error("Failed to get user info:", err);
          }
          const name = userInfo[leaverID].name;
          const type = author === leaverID ? "left the group." : "was removed by the admin of the group";
          api.sendMessage({
              body: `😔 : ${name} ${type}, There are now ${participantIDs.length} members in the group, please enjoy!`
            },
          threadID);
        });
      });
    }
  }
}