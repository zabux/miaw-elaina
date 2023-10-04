import fetch from "node-fetch";
let timeout = 120000;
let poin = 4999;
let handler = async (m, { conn, command, usedPrefix }) => {
	conn.tebaklirik = conn.tebaklirik ? conn.tebaklirik : {};
	let id = m.chat;
	if (id in conn.tebaklirik) {
		conn.reply(
			m.chat,
			"Masih ada soal belum terjawab di chat ini",
			conn.tebaklirik[id][0]
		);
		throw false;
	}
	let res = await (
		await fetch(
			"https://raw.githubusercontent.com/inirey/RESTAPI/42882187ed8e1ebc1060c6021bfc4c5610e0469e/data/tebaklirik.json"
		)
	).json();
	let json = res.getRandom();
	let caption = `
${json.result.question}

Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik ${usedPrefix}terik untuk bantuan
Bonus: ${poin} XP
`.trim();
	conn.tebaklirik[id] = [
		await m.reply(caption),
		json,
		poin,
		setTimeout(() => {
			if (conn.tebaklirik[id])
				conn.reply(
					m.chat,
					`Waktu habis!\nJawabannya adalah *${json.result.answer}*`,
					conn.tebaklirik[id][0]
				);
			delete conn.tebaklirik[id];
		}, timeout),
	];
};
handler.help = ["tebaklirik"];
handler.tags = ["game"];
handler.command = /^tebaklirik/i;
handler.onlyprem = true;
handler.game = true;
export default handler;
