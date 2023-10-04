import axios from "axios";
import PDFDocument from "pdfkit";
import { extractImageThumb } from "@adiwajshing/baileys";
import { detail } from "kiryuu-scraper";
import fetch from "node-fetch";
let handler = async (m, { conn, text, command, usedPrefix }) => {
	if (command === "kiryuu_detail") {
		if (!text) throw "*********ERROR***********";
		let x = await detail(text);
		await conn.sendMedia(m.chat, x.cover, m, {
			caption: `*Title*: ${x.title}\n*Score*: ${x.score}\n*Author*: ${x.author}\n*Status*: ${x.status}\n*Sinopsis*: ${x.synopsis}\n*Genre*: ${x.genres}`,
		});
		let listSections = [],
			tmp = [...x.chapters].map((v) => {
				listSections.push({
					title: `Chapter ${v.chapter}`,
					rows: [
						{
							title: v.chapter,
							rowId: "!kiryuupdf " + v.url,
							description: `${x.title}\n- ${v.url}`,
						},
					],
				});
			});
		const listMessage = {
			text: `Title : ${x.title}`,
			footer: "_Silahkan Pilih Chapter Dibawah..._",
			title: "",
			buttonText: "Chapter List",
			sections: listSections,
		};
		await conn.sendMessage(m.chat, listMessage, { quoted: m });
	}
	if (command === "kiryuupdf") {
		if (!text) throw "Input code";
		await m.reply("_In progress, please wait..._");
		let data = await detail(text);
		let pages = data.content;
		let buffer = await (await fetch(data.content[0])).buffer();
		let jpegThumbnail = await extractImageThumb(buffer);
		let imagepdf = await toPDF(pages);
		await conn.sendMessage(
			m.chat,
			{
				document: imagepdf,
				jpegThumbnail,
				fileName: data.title + ".pdf",
				mimetype: "application/pdf",
			},
			{ quoted: m }
		);
	}
};
handler.command = /^(kiryuu_detail|kiryuupdf)$/;
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
