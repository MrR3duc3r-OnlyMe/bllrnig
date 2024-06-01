module.exports.config = {
    name: "pinterest",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Eugene Aguilar",
    description: "Image search",
    commandCategory: "Search",
    usages: "[Text]",
    cooldowns: 0,
};
module.exports.run = async function({ api, event, args, prefix, outro }) {
    const axios = require("axios");
    const fs = require("fs-extra");
    const request = require("request");
    const keySearch = args.join(" ");
    if(!keySearch){ return api.sendMessage(`Please enter in the format, example: ${prefix}pinterest Naruto\n(it depends on you how many images you want to appear in the result)`, event.threadID, event.messageID)
                  }
  //  const keySearchs = keySearch.substr(0, keySearch.indexOf('-'))
    //const numberSearch = keySearch.split("-").pop() || 6
    const baylon = "https://api.kenliejugarap.com/pinterestbymarjhun";
    const res = await axios.get(`${baylon}?search=${encodeURIComponent(keySearch)}`);
  api.setMessageReaction("⏳", event.messageID, () => {}, true);
  api.sendMessage("⏳ Please wait...", event.threadID, event.messageID);
    const data = res.data.data;
    var num = 0;
    var imgData = [];
    for (var i = 0; i < 10; i++) {
      let path = __dirname + `/cache/Salp${num+=1}.jpg`;
      let getDown = (await axios.get(`${data[i]}`, { responseType: 'arraybuffer' })).data;
      fs.writeFileSync(path, Buffer.from(getDown, 'utf-8'));
      imgData.push(fs.createReadStream(__dirname + `/cache/Salp${num}.jpg`));
    }
  api.setMessageReaction("✅", event.messageID, () => {}, true);
    api.sendMessage({
        attachment: imgData,
        body: '✨ Got 50 search results for keyword: '+ keySearch + "\n\n" + outro
    }, event.threadID, event.messageID)
    for (let ii = 1; ii < 50; ii++) {
        fs.unlinkSync(__dirname + `/cache/Salp${ii}.jpg`)
    }
};
