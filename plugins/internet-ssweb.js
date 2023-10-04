import fetch from "node-fetch";

let handler = async (m, { conn, args, usedPrefix, command }) => {
	if (!args[0]) throw `Contoh: *${usedPrefix + command}* https://google.com`;
	if (!/^https?:\/\//.test(args[0])) args[0] = "http://" + args[0];
	let msg = await conn.sendMessage(
		m.chat,
		{ text: "Please wait.." },
		{ quoted: m }
	);
	//m.reply(args[0])
	let img = await fetch(
		global.API("rose", "/others/ssweb", { url: args[0] }, "apikey")
	).then((a) => a.buffer());
	conn.sendFile(m.chat, img, "", "Sucess !", m);
};
handler.help = ["ssweb"];
handler.tags = ["tools", "internet"];
handler.limit = true;
handler.command = /^ssweb$/i;
export default handler;
