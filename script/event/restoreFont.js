module.exports = {
  config: {
    name: "restoreFont",
    version: "1.0",
    credits: "Neth"
  },
  handleEvent: async({api, event}) => {
    if (!event.body || event.type !== "message_reaction" || event.senderID !== api.getCurrentUserID()) return;
    const fontMapping = {
  "a": "𝚊", "b": "𝚋", "c": "𝚌", "d": "𝚍", "e": "𝚎", "f": "𝚋", "g": "𝚐", "h": "𝚑", "i": "𝚒", "j": "𝚓", "k": "𝚔", "l": "𝚕", "m": "𝚖",
  "n": "𝚗", "o": "𝚘", "p": "𝚙", "q": "𝚚", "r": "𝚛", "s": "𝚜", "t": "𝚝", "u": "𝚞", "v": "𝚟", "w": "𝚠", "x": "𝚡", "y": "𝚢", "z": "𝚣",
  "A": "𝙰", "B": "𝙱", "C": "𝙲", "D": "𝙳", "E": "𝙴", "F": "𝙵", "G": "𝙶", "H": "𝙷", "I": "𝙸", "J": "𝙹", "K": "𝙺", "L": "𝙻", "M": "𝙼",
  "N": "𝙽", "O": "𝙾", "P": "𝙿", "Q": "𝚀", "R": "𝚁", "S": "𝚂", "T": "𝚃", "U": "𝚄", "V": "𝚅", "W": "𝚆", "X": "𝚇", "Y": "𝚈", "Z": "𝚉"
};
function revertFont(text) {
  const reverseFontMapping = Object.fromEntries(
    Object.entries(fontMapping).map(([key, value]) => [value, key])
  );
  return text.split("").map(char => reverseFontMapping[char] || char).join("");
}
    if (event.reaction === "👍") {
      await api.editMessage(revertFont(event.body), event.messageID, () => {
        return;
      });
    }
    
  }
}