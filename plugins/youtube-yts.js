import { youtube } from "@xct007/frieren-scraper";
import fetch from "node-fetch";
let handler = async (m, { conn, text, usedPrefix, command }) => {
	if (!text) throw "Masukan Text Yang Ingin Dicari!";
	let result = await youtube.search(text);
	let caption = result
		.map((v) => {
			return `
🎧 *Title:* ${v.title}
⏱️ *Duration:* ${v.duration}
📤 *Upload:* ${v.uploaded}
👁 *Views:* ${v.views}

🔗 *Link:* ${v.url}
`;
		})
		.filter((v) => v)
		.join("\n\n––––––––––––––––––––––\n\n");
	await conn.reply(
		m.chat,
		`*Hasil Pencarian Dari:* ${text} \n*Terdapat:* ${result.length} Hasil\n\n` +
			caption.trim(),
		m,
		{
			contextInfo: {
				externalAdReply: {
					showAdAttribution: true,
					mediaType: 1,
					title: "Youtube Search 🔎",
					thumbnail: await (
						await fetch("https://telegra.ph/file/044f3dedb3fe3733c7654.jpg")
					).buffer(),
					renderLargerThumbnail: true,
					mediaUrl: hwaifu.getRandom(),
					sourceId: wm,
					sourceUrl: "https://www.youtube.com",
				},
			},
		}
	);
};
handler.help = ["yts"].map((v) => v + " <search>");
handler.tags = ["downloader", "search"];
handler.command = /^(yts|youtubesearch)$/i;
handler.limit = true;
export default handler;
