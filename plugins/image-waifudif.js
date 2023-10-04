import fetch from "node-fetch";

let handler = async (m, { conn, text, command, usedPrefix }) => {
	return m.reply("Fitur sedang dalam perbaikan");
	let _fail = `Contoh: *${
		usedPrefix + command
	}* kagura 1girl solo looking_to_viewer blush ahoge portrait`;
	if (!text) throw _fail;
	conn.waifudif = conn.waifudif ? conn.waifudif : {};
	if (m.sender in conn.waifudif)
		throw "Masih ada proses sebelumnya, silakan tunggu sampai selesai..";
	else conn.waifudif[m.sender] = true;
	m.reply("_Progress..._");
	try {
		let res = await fetch(
			global.API("rose", "/image/waifu/diffusion", { prompt: text })
		);
		let buffer = await res.arrayBuffer();
		conn.sendButton(
			m.chat,
			`Waifu Prompt :\n${text}`,
			global.wm,
			buffer,
			[["Re-Create", `${usedPrefix + command} ${text}`]],
			m
		);
	} catch (_error) {
		m.reply("Proses gagal");
	} finally {
		if (conn.waifudif[m.sender]) delete conn.waifudif[m.sender];
	}
};
handler.help = ["waifudif"];
handler.command = ["waifudif"];
handler.premium = true;
handler.tags = ["ai", "anime", "premium"];
//export default handler;
