const axios = require("axios");
const main = require(__dirname.replace("/script", "") + "/index");
const _ = {
        name: "18+girlfriend",
        version: "1",
        role: 0,
        credits: "Neth",
        description: "🔞 this is 18+!",
        usePrefix: true,
        cooldowns: 0,
        aliases: ["girlfriend", "aigf", "gf", "jowa"],
    };
module.exports.config = _;
module.exports.run = async ({ api, event, args }) => {
    const { threadID, messageID } = event;
    const neth = args.join(" ");
    if (!neth)
        return api.sendMessage(
            `🥵 you need to type first, or you gonna regret it!!! 😏`,
            threadID,
            messageID,
        );

    const ja = await api.sendMessage(`😏 wait here!!`, threadID, messageID);
    const ech = await axios.get(main.apiniJoshua + "/api/ai-gf?q=" + encodeURIComponent(neth));
    if (ech.data.status){
        api.editMessage(`= AI Girlfriend🔞 =\n\n${ech.data.result}`, ja.messageID);
        return;
    } else {
        api.sendMessage(`An error occured!`, threadID);
        return;
    }
};
