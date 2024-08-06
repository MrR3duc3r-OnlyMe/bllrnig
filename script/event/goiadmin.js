module.exports.config = {
	name: "goiadmin",
	version: "1.0.0",
	credits: "John Arida",
	description: "Bot will rep ng tag admin or rep ng tagbot",
};

module.exports.handleEvent = async ({ api, event, admin }) => {
	if (event.senderID !== admin[0] && event.mentions) {
		var aid = [admin[0]];
		for (const id of aid) {
			if (event.mentions[id]) {
				var msg = [
					"Babe nalang iatawag mo sakanya",
					"Stop mentioning my creator, he's busy 😗",
					"My Creator is currently offline 😢",
					"𝖠𝗇𝗈𝗍𝗁𝖾𝗋 𝗍𝖺𝗀 𝗂𝗇 𝗆𝗒 𝖺𝖽𝗆𝗂𝗇, 𝗂 𝗐𝗂𝗅𝗅 𝗉𝗎𝗇𝖼𝗁 𝗒𝗈𝗎 🙂",
					"busy pa ata yun kaya mag-antay ka",
					"Sorry, naka bebetime pa don't disturb him 🙄",
					"Do you like my creator thats why your tagging him? Why dont you add him https://www.facebook.com/swordigo.swordslush 😏",
					"Another tag in my Creator, i will kick your fcking ass"
				];
				api.setMessageReaction("😍", event.messageID, (err) => {}, true);
				return api.sendMessage({body: msg[Math.floor(Math.random()*msg.length)]}, event.threadID, event.messageID);
			}
		}
	}
};
