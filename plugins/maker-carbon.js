import axios from "axios";
let handler = async (m, { conn, text: code, usedPrefix, command }) => {
	let text = m.quoted ? m.quoted.text : code;
	if (!text)
		return m.reply(
			`Masukan Text Yang Ingin Dibuat\n\nContoh:\n${
				usedPrefix + command
			} print(hello world)`
		);
	let res = API("lol", "/api/carbon", { code: encodeURI(text) }, "apikey");
	conn.sendFile(m.chat, res, null, null, m, null);
};
handler.help = ["carbon"];
handler.tags = ["maker"];
handler.command = /^(carbon)$/i;
handler.limit = true;
export default handler;
