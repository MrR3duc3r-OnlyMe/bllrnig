let path = __dirname + "/cache/spotify.mp3";
const axios = require("axios");
const fs = require("fs");


module.exports.config = {
        name: "spotify",
        version: "1.0.2",
        role: 0,
        credits: "joshua deku",
        description: "Play and Download music from Spotify",
        hasPrefix: true,
        cooldown: 0,
        aliases: ["spt", "music2"]
};

module.exports.run = async function ({ api, event, args, Utils}) {
        try {
                let q = args.join(" ");
                if (!q) return api.sendMessage("[ ❗ ] - Missing title of the song", event.threadID, event.messageID);
api.setMessageReaction("⏳", event.messageID, () => {}, true);
                api.sendMessage("[ 🔍 ] Searching for “" + q + "” ...", event.threadID, async (err, info) => {
                        try {
                           const ako = await axios.get(Utils.api_josh + "/spotify?q=" + q);
                                   const dl = (
                                        await axios.get(ako.data.result, { responseType: "arraybuffer" })
                                ).data;
                                fs.writeFileSync(path, Buffer.from(dl, "utf-8"));
                            api.setMessageReaction("✅", event.messageID, () => {}, true);
                                api.sendMessage(
                                        {
                                                                attachment: fs.createReadStream(path),
                                        },
                                        event.threadID,
                                        (err, info) => {
                                                fs.unlinkSync(path);
                                        }
                                );
                        } catch (error) {
                                console.error(error);
                                api.sendMessage("An error occurred while processing your request.", event.threadID);
                        }
                });
        } catch (s) {
                api.sendMessage(s.message, event.threadID);
        }
};