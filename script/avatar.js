const config = {
name: "avatar",
version: "1.0",
credits: "Kenneth Aceberos",
//API by Joshua deku pogi
role: 0,
description: "Create your own avatarwibu photo."
}

const axios = require("axios");
const fs = require("fs");
module.exports = {
  config,
  async run({
    api,
    event,
    args,
    Utils,
    prefix
  }){
    const [id, bgname, signature, color] = args;
    if (!id || !bgname || !signature || !color)
    return api.sendMessage(`Usage: ${prefix}avatar [character id] [name] [signature] [color]\nIf you don't know about [character id], you can choose your own character by typing: ${prefix}getavatar [id]`, event.threadID, event.messageID);
    if (!id || isNaN(id)) return api.sendMessage(`Character ID must be a number`, event.threadID, event.messageID);
    try {
      const response = (await axios.get(`${Utils.api_josh}/canvas/avatar`, {
        params: {
          id,
          bgname,
          signature,
          color
        }
      }, {
        responseType: "arraybuffer"
      })).data;
      if (!response) return api.sendMessage(`An error occured.`, event.threadID);
      const path = `${__dirname}/cache/${event.senderID}${bgname+id}.png`;
      fs.writeFileSync(path, Buffer.from(response, "utf-8"));
      const finalImg = fs.createReadStream(path);
      api.sendMessage({
        body: `😊 Here is your request`,
        attachment: finalImg
      }, event.threadID, () => fs.unlinkSync(path), event.messageID);
    } catch (error){
      console.error(error);
      api.sendMessage("An error occured.", event.threadID);
      return;
    }
  }
}