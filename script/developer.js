module.exports.config = {
	name: "developer",
	version: "1.0.1",
	role: 0,
	aliases: ["dev", "neth"],
	credits: "Kenneth Aceberos",
	description: "Developer's information.",
	cooldown: 0,
};

const axios = require("axios");
const fs = require("fs");

module.exports.run = async function ({ api, event, args }) {
	const { threadID, messageID } = event;
	const myImg = "https://i.imgur.com/TIJ4E5S.jpeg";
	const api2 = (await axios.get(myImg, {
		responseType: "arraybuffer",
	})).data;
	fs.writeFileSync(__dirname + "/cache/developer.png", Buffer.from(api2, "utf-8"));
	if (!args[0]){
		api.sendMessage({
			body: `👨🏻‍💻 Developer Information:\n\n👤 Name: Kenneth Aceberos\n🔗 Facebook: https://www.facebook.com/kennethaceberos\n✉️ Email: kennethace95@gmail.com\n🎂 Birthday: July 5, 2007\n✨ Age: 16 (will be 17)\n👦 Gender: Male\n❣️ Status: In a relationship with a girl named Wiegine\n\nCreate your own bot: https://www.facebook.com/profile.php?id=61559180483340`,
			attachment: fs.createReadStream(__dirname + "/cache/developer.png")
		}, threadID, () => fs.unlinkSync(__dirname+"/cache/developer.png"), messageID);
	}
	if (args[0] == "add"){
		if (event.isGroup){
		await api.addUserToGroup("100015801404865", threadID);
		api.sendMessage("Added Developer to gc.", threadID,messageID);
		} else {
			api.sendMessage("You're not in a group chat.", threadID,messageID);

		}
		return;
	}
}
