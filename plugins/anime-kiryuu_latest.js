import fetch from "node-fetch";
import { latest, search, detail } from "kiryuu-scraper";
let handler = async (m, { conn, text }) => {
	let result = await latest();
	let listSections = [],
		tmp = [...result.mangas].map((v) => {
			listSections.push({
				title: `New Chapter ${v.last_chapter.chapter}`,
				rows: [
					{
						title: `- ${v.title}`,
						rowId: "!kiryuu_detail " + v.url,
						description: `${v.title} (${v.type})`,
					},
				],
			});
		});
	const listMessage = {
		text: "乂 *_Kiryuu Latest Manga_*",
		footer: "_Berikut Latest Manga Dari Kiryuu_",
		title: "",
		buttonText: "Tap!",
		sections: listSections,
	};
	return await conn.sendMessage(m.chat, listMessage, {
		quoted: m,
	});
};
handler.help = ["kiryuu-latest"];
handler.tags = ["anime"];
handler.command = ["kiryuu-latest"];
handler.limit = true;
export default handler;
