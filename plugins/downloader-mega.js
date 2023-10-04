import { File } from "megajs";
import { lookup } from "mime-types";

let handler = async (m, { conn, args }) => {
	if (!args[0]) throw "Input URL";
	let url = new URL(
		/^https?:\/\//.test(args[0]) ? args[0] : `https://${args[0]}`
	);
	if (!/mega.nz|mega.co.nz/.test(url.hostname)) throw "Invalid URL";
	let file = File.fromURL(args[0]);
	m.reply(wait);
	await file.loadAttributes();
	let data = await file.downloadBuffer();
	let mime = await lookup(data);
	await conn.sendMessage(
		m.chat,
		{ document: { url: data }, fileName: file.name, mime },
		{ quoted: m }
	);
};
handler.help = ["mega"].map((v) => v + " <url>");
handler.tags = ["downloader"];
handler.command = /^mega(dl)?$/i;

export default handler;
