import fetch from "node-fetch";
let handler = async (m, { conn, usedPrefix, text, args, command }) => {
	if (!text) throw `Uhm.. Teksnya mana?`;
	try {
		let res = await fetch(`https://api.azz.biz.id/api/gpt?q=${text}&user=alwiy&key=global`);
		let x = await res.json();
		await conn.reply(m.chat, `${x.respon}`, m);
	} catch (e) {
		throw "Maaf Terjadi Error...";
	}
};
handler.help = ["ai"].map((v) => v + " <text>");
handler.tags = ["tool"];
handler.command = /^ai/i;
handler.premium = true;
export default handler;
