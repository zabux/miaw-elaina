import axios from "axios";
let handler = async (m, { conn, text, usedPrefix, command }) => {
	if (!text)
		return m.reply(
			`Masukan Query!\n\nExample:\n${usedPrefix + command} Hu Tao`
		);
	conn.sendReact(m.chat, "🕐", m.key);
	let url = await axios.get(
		API("xzn", "/api/ttsearch", { count: 30, search: text }, null)
	);
	let json = url.data.getRandom();
	let caption = `
*❏ Tiktok Search*

▧ *Duration:* ${json.duration}
▧ *Caption:* ${json.title}
`.trim();
	await conn.sendFile(m.chat, json.play, text + ".mp4", caption, m);
	conn.sendReact(m.chat, "", m.key);
};
handler.help = ["tiktok-search"].map((v) => v + " <query>");
handler.tags = ["search"];
handler.command = /^(tiktoksearch|tiktok-search)$/i;
handler.limit = true;
export default handler;
