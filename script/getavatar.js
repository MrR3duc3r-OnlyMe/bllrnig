const config = {
name: "getavatar",
version: "1.0",
credits: "Kenneth Aceberos",
//API by Joshua deku pogi
role: 0,
description: "Get Avatar by ID and used for avatar/cover cmds."
}

const axios = require("axios");
const fs = require("fs");
module.exports = {
  config,
  async run({
    api,
    event,
    args
  }){
    const id = args[0];
    if (!id || isNaN(id)) return api.sendMessage(`Provide an ID. (id must be number)`, event.threadID, event.messageID);
    try {
      const response = await axios.get(`${Utils.api_josh}/canvas/search`, {
        params: {
          id
        }
      });
      const { id_length, data, error } = response.data;
      if (error) return api.sendMessage(`❌Anime ${id} not found!`, event.threadID);
      const { imgAnime, dm } = data;
      const anime = imgAnime.split("/");
      const path = `${__dirname}/cache/${event.senderID}${anime[2]}.png`;
      const img = await axios.get(imgAnime, { responseType: "arraybuffer" });
      fs.writeFileSync(path, Buffer.from(img.data, "utf-8"));
      const finalImg = fs.createReadStream(path);
      api.sendMessage({
        body: `✅Anime ID Info:\nName: ${dm || anime[6].replace(".png", "") || "Anime"}\n\nTotal Anime ID's: ${id_length}`,
        attachment: finalImg
      }, event.threadID, () => fs.unlinkSync(path), event.messageID);
    } catch (error){
      console.error(error);
      api.sendMessage("An error occured.", event.threadID);
      return;
    }
  }
}