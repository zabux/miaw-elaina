import fetch from "node-fetch";
let handler = async (m, { conn, args, usedPrefix }) => {
	let response = args.join(" ").split("|");
	if (!args[0]) throw `Usage Example ${usedPrefix}pornhub Teks1|Teks2`;
	m.reply("Proses...");
	let res = `https://api.lolhuman.xyz/api/textprome2/pornhub?apikey=RyHar&text1=${response[0]}&text2=${response[1]}`;
	conn.sendFile(m.chat, res, "error.jpg", "Ini Dia...", m, false);
};
handler.help = ["pornhub"].map((v) => v + " <text1>|<teks2>");
handler.tags = ["maker"];
handler.command = /^(pornhub)$/i;

handler.limit = true;

export default handler;
