import fetch from "node-fetch";
let handler = async (m, { conn, usedPrefix, command, text }) => {
	if (!text) throw "Judul Nya?";
	try {
		let f = await fetch(
			`https://api.lolhuman.xyz/api/nhentaisearch?apikey=RyHar&query=${text}`
		);
		let xx = await f.json();
		let pii = xx.result;
		let row = Object.values(pii).map((v, index) => ({
			title: `乂 ${v.title_native}`,
			description: "",
			rowId: usedPrefix + "nhentaisget " + text + "|" + index + "|" + v.id,
		}));
		let button = {
			buttonText: "Tap!",
			description: `乂 Silahkan Pilih Kata Kunci ${text} Dibawah`,
			footerText: wm,
		};
		return conn.sendListM(m.chat, button, row, m);
	} catch (e) {
		throw "_Terjadi Error, Silahkan Coba Lagi..._";
	}
};
handler.help = ["nhentais <pencarian>"];
handler.tags = ["nsfw"];
handler.command = /^(nhentais)$/i;
handler.premium = true;
handler.nsfw = true;
handler.age = 18;
export default handler;
