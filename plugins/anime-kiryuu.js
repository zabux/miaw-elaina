import fetch from "node-fetch";
import { search } from "kiryuu-scraper";
let handler = async (m, { conn, text, usedPrefix }) => {
	if (!text)
		throw `Judul Manganya Mana Kak?\n\nContoh: ${usedPrefix}kiryuu Shingeki No Kyojin`;
	let result = await search(text);
	let listSections = [],
		tmp = [...result.mangas].map((v) => {
			listSections.push({
				title: v.last_chapter.chapter,
				rows: [
					{
						title: v.title,
						rowId: "!kiryuu_detail " + v.url,
						description: ``,
					},
				],
			});
		});
	const listMessage = {
		text: "乂 *_Kiryuu Search_*",
		footer: "_Silahkan Pilih Manga Dibawah_",
		title: "",
		buttonText: "Tap!",
		sections: listSections,
	};
	return await conn.sendMessage(m.chat, listMessage, {
		quoted: m,
	});
};
handler.help = ["kiryuu"];
handler.tags = ["anime"];
handler.command = ["kiryuu"];
handler.limit = true;
export default handler;
