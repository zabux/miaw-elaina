import { ttslide } from "../lib/scrape.js";
let handler = async (m, { conn, command, usedPrefix, text }) => {
	if (!text)
		return m.reply(
			`Masukan Link TiktokSlide!\n\nContoh:\n${
				usedPrefix + command
			} https://vt.tiktok.com/ZS8EtrGa8/`
		);
	let data = await ttslide(text);
	m.reply(wait);
	if (data.imgSrc.length < 1)
		return conn.sendFile(m.chat, data.imgSrc[0], "tiktokslide.jpg", null, m);
	if (data.imgSrc.length > 1 && m.isGroup) {
		conn.sendFile(
			m.chat,
			data.imgSrc[0],
			"tiktokslide.jpg",
			`Bot Akan Mengirim Sisa *${data.imgSrc.length - 1} Foto* Di Private Chat`,
			m
		);
		for (let img of data.imgSrc) {
			if (img !== data.imgSrc[0]) {
				await delay(2000);
				await conn.sendFile(m.sender, img, "tiktokslide.jpg", null, m);
			}
		}
	} else {
		for (let img of data.imgSrc) {
			await delay(2000);
			await conn.sendFile(m.chat, img, "tiktokslide.jpg", null, m);
		}
	}
};
handler.help = ["tiktokslide"].map((v) => v + " <url>");
handler.tags = ["downloader"];
handler.command = /^ttslide|tiktokslide$/i;
handler.limit = true;
export default handler;
const delay = (time) => new Promise((res) => setTimeout(res, time));
