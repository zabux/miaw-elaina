import { removeBackgroundFromImageUrl } from "remove.bg";
import uploadFile from "../lib/uploadFile.js";
let handler = async (m, { conn, usedPrefix, command }) => {
	let q = m.quoted ? m.quoted : m;
	let mime = (q.msg || q).mimetype || "";
	if (!mime) throw "Fotonya Mana?";
	if (!/image\/(jpe?g|png)/.test(mime)) throw `Tipe ${mime} tidak didukung!`;
	m.reply(wait);
	let img = await q.download?.();
	let url = await uploadFile(img);
	let out = await nobg(url);
	await conn.sendFile(m.chat, out, "out.png", "*DONE (≧ω≦)ゞ*", m);
};
handler.help = ["removebg"];
handler.tags = ["tools", "premium"];
handler.command = /^(removebg|nobg)$/i;
handler.premium = true;
export default handler;

async function nobg(url) {
	try {
		const result = await removeBackgroundFromImageUrl({
			url,
			apiKey: "8ktfySCQuntAvhY1vE7xBksB",
			size: "regular",
			type: "auto",
		});
		return Buffer.from(result.base64img, "base64");
	} catch (e) {
		return {
			status: false,
			error: e,
		};
	}
}
