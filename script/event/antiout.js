const config = {
  name: "antiout",
  version: "1.0.0",
  credits: "Kenneth Aceberos",
  description: "Can re-add member if someone leaves in a group chat."
};
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
    event,
    api
  }) {
    if (!event.isGroup) return;
    if (event.logMessageData?.leftParticipantFbId === api.getCurrentUserID()) return;
    if (event.logMessageData?.leftParticipantFbId) {
      const info = await api.getUserInfo(event.logMessageData?.leftParticipantFbId);
      const {
        name
      } = info[event.logMessageData?.leftParticipantFbId];
      api.addUserToGroup(event.logMessageData?.leftParticipantFbId, event.threadID, (error) => {
        if (error) {
          api.sendMessage(`Hmmm? I can't re-add member ${name} to the group...`, event.threadID);
        } else {
          api.sendMessage(`DON'T BE MEAN TO US, AS AN RESULT...\n${name} will be added again to the group!`, event.threadID);
        }
      });
    }
  }
}