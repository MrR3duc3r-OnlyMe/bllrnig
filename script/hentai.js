const axios = require("axios");
const fs = require('fs');
const path = require('path');
const main = require(__dirname.replace("/script", "") + '/index');

module.exports.config = {
    name: "hentai",
    version: "1.0.0",
    credits: "chill",
    description: "Send a random hentai video",
    hasPrefix: false,
    cooldown: 3,
    aliases: ["yamete"]
};

module.exports.run = async function ({ api, event }) {
    try {
        api.sendMessage("Fetching a hentai video...", event.threadID, async (chilli, kalamansi) => {
            if (chilli) {
                console.error("Error sending initial message:", chilli);
                return api.sendMessage("An error occurred while processing your request.", event.threadID);
            }

            try {
                const pangit = await axios.get(`${main.apiniJoshua}/api/randhntai`);
                const kamatis = pangit.data.result[0];

                const pogi = kamatis.video_1;
                const sibuyas = kamatis.title;

                const chilliPath = path.join(__dirname, `${event.senderID}jakolinmoko.mp4`);
                const kalamansiResponse = await axios({
                    url: pogi,
                    method: 'GET',
                    responseType: 'stream'
                });

                const writer = fs.createWriteStream(chilliPath);
                kalamansiResponse.data.pipe(writer);

                writer.on('finish', () => {
                    api.sendMessage({
                        body: `Magjajabol nayan🥵\n\n${sibuyas}`,
                        attachment: fs.createReadStream(chilliPath)
                    }, event.threadID, () => {
                        fs.unlinkSync(chilliPath, (pangit) => {
                            if (pangit) console.error("Error deleting video file:", pangit);
                        });
                    });
                });

                writer.on('error', (pogi) => {
                    console.error("Error saving video file:", pogi);
                    api.sendMessage("An error occurred while processing your request.", event.threadID);
                });
            } catch (pangit) {
                console.error("Error fetching video:", pangit);
                api.sendMessage("An error occurred while processing your request.", event.threadID);
            }
        });
    } catch (pangit) {
        console.error("error:", pangit)
        api.sendMessage("An error occurred while processing your request.", event.threadID);
    }
};