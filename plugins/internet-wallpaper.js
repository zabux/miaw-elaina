import axios from "axios";
import cheerio from "cheerio";
let handler = async (m, { conn, text, usedPrefix, command }) => {
	if (!text)
		return m.reply(`Masukan Query!\n\nContoh:\n${usedPrefix + command} Anime`);
	let res = await wallpaper(text, Math.floor(Math.random() * 10));
	let img = res.getRandom();
	await conn.sendMessage(
		m.chat,
		{
			image: { url: img.image[0] },
			fileName: "wallpaper.jpeg",
			mimetype: "image/jpeg",
			caption: `Result from: *${capitalize(text)}*`,
		},
		{ quoted: m }
	);
};
handler.help = ["wallpaper"].map((v) => v + " <query>");
handler.tags = ["downloader"];
handler.command = /^wallpaper$/i;

export default handler;

function wallpaper(title, page = "1") {
	return new Promise((resolve, reject) => {
		axios
			.get(
				`https://www.besthdwallpaper.com/search?CurrentPage=${page}&q=${title}`
			)
			.then(({ data }) => {
				let $ = cheerio.load(data);
				let hasil = [];
				$("div.grid-item").each(function (a, b) {
					hasil.push({
						title: $(b).find("div.info > a > h3").text(),
						type: $(b).find("div.info > a:nth-child(2)").text(),
						image: [
							$(b).find("picture > img").attr("data-src") ||
								$(b).find("picture > img").attr("src"),
							$(b).find("picture > source:nth-child(1)").attr("srcset"),
							$(b).find("picture > source:nth-child(2)").attr("srcset"),
						],
					});
				});
				resolve(hasil);
			});
	});
}

function capitalize(word) {
	return word.charAt(0).toUpperCase() + word.substr(1);
}
