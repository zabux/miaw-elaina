import fetch from "node-fetch";
let handler = async (m, { conn, usedPrefix, command, text }) => {
	let [judul, page, kode] = text.split("|");
	let f = await fetch(
		`https://api.lolhuman.xyz/api/nhentai/${kode}?apikey=RyHar`
	);
	let x = await fetch(
		`https://api.lolhuman.xyz/api/nhentaisearch?apikey=RyHar&query=${judul}`
	);
	let xx = await f.json();
	let pii = xx.result.image[0];
	let yy = await x.json();
	let hh = yy.result[page];
	let teks = `乂 ${hh.title_english}

❃ *Title Native:* ${hh.title_native}
❃ *Total Page:* ${hh.page}
❃ *Code:* ${hh.id}
`;
	await conn.sendFile(m.chat, pii, "nhentai.jpg", teks, m);
};
handler.command = /^(nhentaisget)$/i;
handler.premium = true;
export default handler;
