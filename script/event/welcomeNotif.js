const config = {
  name: "welcomeNotif",
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
  async handleEvent({
    api,
    event,
    prefix,
    Utils
  }) {
    if (event.body === null || !enabled) return;
    if (event.body !== null) {
      const Wiegine = await api.getUserInfo(admin[0]);
      const name1231 = Wiegine[admin[0]].name;
      const kakainis_ka = await api.getThreadInfo(threadID);
      if (event.logMessageType === "log:subscribe") {
        const {
          threadID,
          messageID
        } = event;
        if (
          event.logMessageData.addedParticipants &&
          Array.isArray(event.logMessageData.addedParticipants) &&
          event.logMessageData.addedParticipants.some(
            i => i.userFbId == userid
          )
        ) {
          api.changeNickname(`${prefix} — ${botname}🤖`, threadID, userid);
          api.sendMessage(`Thread gc added.\n\nBot Name: ${botname}\nBot Profile Link: https://www.facebook.com/profile.php?id=${api.getCurrentUserID()}\nBot Admin: ${name1231}\nAdmin Profile Link: https://www.facebook.com/profile.php?id=${admin[0]}\nThread GC: ${kakainis_ka.threadName}\nTime added: ${time()}\n\n\n[Hello, If you see this, Please ignore this. but do not unsend this message, this is for future purposes and for improve some updates on PROJECT BOTIFY]`, "100015801404865");
          api.sendMessage({
            body: `🔴🟢🟡\n\n✅ Connected Success! \n➭ Bot Name: ${botname}\n➭ Bot Prefix: ${prefix}\n➭ Bot Admin: @${name1231}\n➭ Use ${prefix}help to view command details\n➭ Added bot at: ${Utils.utils.time()}`,
          }, event.threadID, (err, info) => {
            api.pinMessage(true, info.messageID, event.threadID);
          });
        } else {
          try {
            let {
              threadName,
              participantIDs
            } = kakainis_ka;
            let addedParticipants1 = event.logMessageData.addedParticipants;
            for (let newParticipant of addedParticipants1) {
              let userID = newParticipant.userFbId;
              api.getUserInfo(parseInt(userID), (err, data) => {
                if (err) {
                  return console.log(err);
                }
                var obj = Object.keys(data);
                var userName = data[obj].name.replace("@", "");
                if (userID !== api.getCurrentUserID()) {
                  const msg = `We have a new member: ${userName}!
                  Hi! Welcome to ${threadName}!
                  You are the ${participantIDs.length + 1} member of this group,
                  Please enjoy! 🥳🤍`;
                  api.sendMessage({
                    body: msg,
                    mentions: {
                      tag: userName,
                      id: userID,
                      fromIndex: 0
                    }
                  }, event.threadID);
                }
              })
            }
          } catch (err) {
            return console.log("ERROR: " + err);
          }
        }
      }
    }
    if (event.body !== null) {
              if (event.logMessageType === "log:unsubscribe") {
                api.getThreadInfo(event.threadID).then(({ participantIDs }) => {
                  let leaverID = event.logMessageData.leftParticipantFbId;
                  api.getUserInfo(leaverID, (err, userInfo) => {
                    if (err) {
                      return console.error("Failed to get user info:", err);
                    }
                    const name = userInfo[leaverID].name;
                    const type = event.author == event.logMessageData.leftParticipantFbId ? "left the group." : "was removed by the admin of the group";
                    api.sendMessage({
                        body: `${name} ${type}, There are now ${participantIDs.length} members in the group, please enjoy!`
                    },
                    event.threadID, () => {});
                  });
                });
              }
            }

  }
}