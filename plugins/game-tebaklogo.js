import fetch from "node-fetch";
let timeout = 120000;
let poin = 4999;
let handler = async (m, { conn, command, usedPrefix }) => {
	conn.tebaklogo = conn.tebaklogo ? conn.tebaklogo : {};
	let id = m.chat;
	if (id in conn.tebaklogo) {
		conn.reply(
			m.chat,
			"Masih ada soal belum terjawab di chat ini",
			conn.tebaklogo[id][0]
		);
		throw false;
	}
	let src = await (
		await fetch(
			"https://raw.githubusercontent.com/Hendra827/database/d1935c6443fd25f45ef02b0f5d57049c49810ef4/games/tebaklogo.json"
		)
	).json();
	let json = src[Math.floor(Math.random() * src.length)];
	let caption = `
${json.deskripsi}

Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik ${usedPrefix}hlogo untuk bantuan
Bonus: ${poin} XP
`.trim();
	conn.tebaklogo[id] = [
		await conn.sendFile(m.chat, json.img, "tebaklogo.jpg", caption, m),
		json,
		poin,
		setTimeout(() => {
			if (conn.tebaklogo[id])
				conn.reply(
					m.chat,
					`Waktu habis!\nJawabannya adalah *${json.jawaban}*`,
					conn.tebaklogo[id][0]
				);
			delete conn.tebaklogo[id];
		}, timeout),
	];
};
handler.help = ["tebaklogo"];
handler.tags = ["game"];
handler.command = /^tebaklogo/i;
handler.onlyprem = true;
handler.game = true;
export default handler;
