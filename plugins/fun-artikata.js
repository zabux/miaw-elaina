import fetch from "node-fetch";
let handler = async (m, { conn, usedPrefix, text, args, command }) => {
	if (!text) throw `Uhm.. Teksnya mana?`;
	try {
		let res = await fetch(
			`https://api.zahwazein.xyz/entertainment/artikata?query=${text}&apikey=cf0522e0c76d`
		);
		let x = await res.json();
		await conn.reply(m.chat, `${x.result.arti}\n\n${x.result.contoh}`, m);
	} catch (e) {
		throw "Maaf Terjadi Error...";
	}
};
handler.help = ["artikata"].map((v) => v + " <text>");
handler.tags = ["internet"];
handler.command = /^artikata$/i;
export default handler;
