const config = {
  name: "setnsfw",
  description: "Set NSFW to thread/group chat",
  credits: "Neth",
  version: "1.0",
  role: 2,
}

module.exports = {
  config,
  async run ({ api, event, Utils }){
    const t = event.threadID;
    const b = `${t}_nsfw`;
    const k = Utils.threads.get(b);
    let ns = k;
    const send = (message) => {
      api.sendMessage(message, event.threadID, event.messageID);
    }
    ns = !ns;
    Utils.threads.set(b, ns);
    send(`🔞 NSFW mode to this thread is turned ${ns ? "on" : "off"}.`);
  }
}