import { removeBackgroundFromImageUrl } from "remove.bg";
import uploadFile from "../lib/uploadFile.js";
let handler = async (m, { conn, usedPrefix, command, text }) => {
	let q = m.quoted ? m.quoted : m;
	let mime = (q.msg || q).mimetype || "";
	if (!mime) throw "Fotonya Mana?";
	if (!/image\/(jpe?g|png)/.test(mime)) throw `Tipe ${mime} tidak didukung!`;
	m.reply(wait);
	let img = await q.download?.();
	let url = await uploadFile(img);
	let out = await changebg(url, m.quoted ? m.quoted.text : text);
	await conn.sendFile(m.chat, out, "out.png", "*DONE (≧ω≦)ゞ*", m);
};
handler.help = ["changebg"];
handler.tags = ["tools", "premium"];
handler.command = /^(cb|changebg|changebackground)$/i;
handler.premium = true;
export default handler;

async function changebg(url, color) {
	try {
		const result = await removeBackgroundFromImageUrl({
			url,
			apiKey: "8ktfySCQuntAvhY1vE7xBksB",
			size: "regular",
			type: "auto",
			bg_color: color,
		});
		return Buffer.from(result.base64img, "base64");
	} catch (e) {
		return {
			status: false,
			error: e,
		};
	}
}
