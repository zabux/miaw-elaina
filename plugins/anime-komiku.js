import { komikuId } from "@xct007/frieren-scraper";
import fetch from "node-fetch";
import axios from "axios";
import PDFDocument from "pdfkit";
import { extractImageThumb } from "@adiwajshing/baileys";
let handler = async (m, { conn, usedPrefix, command, text }) => {
	if (!text && !/komiku-latest|komikulatest/i.test(command))
		return m.reply("Masukan Nama Komik Atau Link Yang Ingin Di Cari");
	if (/komiku-latest|komikulatest/i.test(command)) {
		let data = await komikuId.latest();
		let caption = data
			.map((v) => {
				return `
❏ *Title:* ${v.title}
▧ *Update:* ${v.updated}
▧ *Chapter:* ${v.chapter}
▧ *Url:* ${v.url}
`.trim();
			})
			.join("\n\n\n");
		await conn.reply(m.chat, caption, m, {
			contextInfo: {
				externalAdReply: {
					showAdAttribution: true,
					mediaType: 1,
					title: "",
					thumbnail: await (
						await fetch("https://telegra.ph/file/6e0ed8feaa91c4eea1d11.jpg")
					).buffer(),
					renderLargerThumbnail: true,
					mediaUrl: hwaifu.getRandom(),
					sourceId: wm,
					sourceUrl: "",
				},
			},
		});
	} else if (
		!text.startsWith("https://komiku.id/manga") &&
		!text.startsWith("https://komiku.id/ch")
	) {
		let data = await komikuId.search(text);
		let caption = data
			.map((v) => {
				return `
❏ *Title:* ${v.title}
▧ *Chapter:* ${v.awal} - ${v.terbaru}
▧ *Description:* ${v.description}
▧ *Url:* ${v.url}
`.trim();
			})
			.join("\n\n\n");
		await conn.reply(m.chat, caption, m, {
			contextInfo: {
				externalAdReply: {
					showAdAttribution: true,
					mediaType: 1,
					title: "",
					thumbnail: await (
						await fetch("https://telegra.ph/file/6e0ed8feaa91c4eea1d11.jpg")
					).buffer(),
					renderLargerThumbnail: true,
					mediaUrl: hwaifu.getRandom(),
					sourceId: wm,
					sourceUrl: "",
				},
			},
		});
	} else if (text.startsWith("https://komiku.id/manga")) {
		let data = await komikuId.detail(text);
		let image = await komikuId.search(data.title);
		let caption = `
❃ *Title:* ${data.title}
❃ *Chapter:* ${data.metadata.awal} - ${data.metadata.terbaru}
❃ *Status:* ${data.metadata.status}
❃ *Jenis:* ${data.metadata.jenis_komik}
❃ *Cerita:* ${data.metadata.konsep_cerita}
❃ *Komikus:* ${data.metadata.komikus}
❃ *Pembaca:* ${data.metadata.umur_pembaca}

❃ *Description:* ${data.description}
`.trim();
		let chapters = data.chapters
			.map((v) => {
				return `
❏ *Chapter:* ${v.chapter}
▧ *Url:* ${v.url}
`.trim();
			})
			.join("\n\n");
		await conn.sendFile(
			m.chat,
			image[0].thumbnail,
			"komiku.jpeg",
			caption,
			m,
			false
		);
		await delay(2000);
		await conn.reply(m.chat, chapters, m, {
			contextInfo: {
				externalAdReply: {
					showAdAttribution: true,
					mediaType: 1,
					title: "",
					thumbnail: await (
						await fetch("https://telegra.ph/file/6e0ed8feaa91c4eea1d11.jpg")
					).buffer(),
					renderLargerThumbnail: true,
					mediaUrl: hwaifu.getRandom(),
					sourceId: wm,
					sourceUrl: "",
				},
			},
		});
	} else if (text.startsWith("https://komiku.id/ch")) {
		let result = await komikuId.detail(text);
		let buffer = await (await fetch(result.images[0])).buffer();
		let jpegThumbnail = await extractImageThumb(buffer);
		let imagepdf = await toPDF(result.images);
		await conn.sendMessage(
			m.chat,
			{
				document: imagepdf,
				jpegThumbnail,
				fileName: result.title + ".pdf",
				mimetype: "application/pdf",
			},
			{ quoted: m }
		);
	}
};
handler.help = ["komiku", "komiku-latest"];
handler.tags = ["anime"];
handler.command = /^(komiku|komikulatest|komiku-latest)$/i;
handler.limit = true;
export default handler;

function toPDF(images, opt = {}) {
	return new Promise(async (resolve, reject) => {
		if (!Array.isArray(images)) images = [images];
		let buffs = [],
			doc = new PDFDocument({
				margin: 0,
				size: "A4",
			});
		for (let x = 0; x < images.length; x++) {
			if (/.webp|.gif/.test(images[x])) continue;
			let data = (
				await axios.get(images[x], {
					responseType: "arraybuffer",
					...opt,
				})
			).data;
			doc.image(data, 0, 0, {
				fit: [595.28, 841.89],
				align: "center",
				valign: "center",
			});
			if (images.length != x + 1) doc.addPage();
		}
		doc.on("data", (chunk) => buffs.push(chunk));
		doc.on("end", () => resolve(Buffer.concat(buffs)));
		doc.on("error", (err) => reject(err));
		doc.end();
	});
}

const delay = (time) => new Promise((res) => setTimeout(res, time));
