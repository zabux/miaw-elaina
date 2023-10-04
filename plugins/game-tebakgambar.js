import fetch from "node-fetch";
let timeout = 120000;
let poin = 4999;
let handler = async (m, { conn, command, usedPrefix }) => {
	conn.tebakgambar = conn.tebakgambar ? conn.tebakgambar : {};
	let id = m.chat;
	if (id in conn.tebakgambar) {
		conn.reply(
			m.chat,
			"Masih ada soal belum terjawab di chat ini",
			conn.tebakgambar[id][0]
		);
		throw false;
	}
	let src = await (
		await fetch(
			"https://raw.githubusercontent.com/veann-xyz/result-daniapi/main/games/tebakgambar.json"
		)
	).json();
	let json = src[Math.floor(Math.random() * src.length)];
	let caption = `
${json.deskripsi}

Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik ${usedPrefix}hgamb untuk bantuan
Bonus: ${poin} XP
`.trim();
	conn.tebakgambar[id] = [
		await conn.sendMessage(
			m.chat,
			{
				image: { url: json.img },
				fileName: "tebakgambar.jpg",
				mimetype: "image/jpeg",
				caption: caption,
			},
			{ quoted: m }
		),
		json,
		poin,
		setTimeout(() => {
			if (conn.tebakgambar[id])
				conn.reply(
					m.chat,
					`Waktu habis!\nJawabannya adalah *${json.jawaban}*`,
					conn.tebakgambar[id][0]
				);
			delete conn.tebakgambar[id];
		}, timeout),
	];
};
handler.help = ["tebakgambar"];
handler.tags = ["game"];
handler.command = /^tebakgambar/i;
handler.onlyprem = true;
handler.game = true;
export default handler;
