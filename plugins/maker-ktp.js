import fetch from "node-fetch";
import uploadImage from "../lib/uploadImage.js";
let handler = async (m, { conn, args, usedPrefix }) => {
	let q = m.quoted ? m.quoted : m;
	let mime = (q.msg || q).mimetype || "";
	if (!mime) throw "Fotonya Mana?";
	if (!/image\/(jpe?g|png)/.test(mime))
		throw `_*Mime ${mime} tidak didukung!*_`;
	let img = await q.download();
	let url = await uploadImage(img);
	let response = args.join(" ").split(".");
	if (
		!response[0] ||
		!response[1] ||
		!response[2] ||
		!response[3] ||
		!response[4] ||
		!response[5] ||
		!response[6] ||
		!response[7] ||
		!response[8] ||
		!response[9] ||
		!response[10] ||
		!response[11] ||
		!response[12] ||
		!response[13] ||
		!response[14]
	)
		throw (
			`Masukan Format\n\nContoh: \n${usedPrefix}ktp ` +
			"1.2.3.4.5.6.7.8.9.10.11.12.13.14.15"
		);
	let res = `https://api.lolhuman.xyz/api/ktpmaker?apikey=RyHarJR&nik=${response[0]}&prov=${response[1]}&kabu=${response[2]}&name=${response[3]}&ttl=${response[4]}&jk=${response[5]}&jl=${response[6]}&rtrw=${response[7]}&lurah=${response[8]}&camat=${response[9]}&agama=${response[10]}&nikah=${response[11]}&kerja=${response[12]}&warga=${response[13]}&until=${response[14]}&img=${url}`;
	await conn.sendFile(m.chat, res, "error.jpg", "Ini Dia Kak", m, false);
};
handler.help = ["ktp"];
handler.tags = ["maker"];
handler.command = /^(ktp)$/i;
handler.premium = true;
export default handler;
