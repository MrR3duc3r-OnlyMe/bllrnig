module.exports.config = {
  name: "cmd",
  version: "1",
  aliases: ["eval"],
  role: 3,
  credits: "neth",
  description: "Evaluate JS scripts. for superadmin only!",
  hasPrefix: true,
  usePrefix: true,
  commandCategory: "Admin",
  cooldown: 0
};

module.exports.run = async function({ api, event, args }) {
    const input = args.join(" ");
    /*if (input.toLowerCase() == "restart"){
        api.sendMessage(`🤖 Restarting...`, event.threadID, event.messageID);
        await eval("process.exit(1)");
        return;
        }*/
    try {
      await eval(input);
     } catch (error) {
      api.sendMessage(
        `${error.message}`,
        event.threadID, event.messageID
      );
    }
}