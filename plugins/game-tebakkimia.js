import fetch from "node-fetch";
let timeout = 120000;
let poin = 4999;
let handler = async (m, { conn, command, usedPrefix }) => {
	conn.tebakkimia = conn.tebakkimia ? conn.tebakkimia : {};
	let id = m.chat;
	if (id in conn.tebakkimia) {
		conn.reply(
			m.chat,
			"Masih ada soal belum terjawab di chat ini",
			conn.tebakkimia[id][0]
		);
		throw false;
	}
	let res = await (
		await fetch(
			`https://raw.githubusercontent.com/veann-xyz/result-daniapi/main/games/tebakkimia.json`
		)
	).json();
	let json = res.getRandom();
	let caption = `
Silahkan Tebak Kepanjangan Dari Unsur "${json.lambang}"

Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik ${usedPrefix}hmia untuk bantuan
Bonus: ${poin} XP
`.trim();
	conn.tebakkimia[id] = [
		await m.reply(caption),
		json,
		poin,
		setTimeout(() => {
			if (conn.tebakkimia[id])
				conn.reply(
					m.chat,
					`Waktu habis!\nJawabannya adalah *${json.unsur}*`,
					conn.tebakkimia[id][0]
				);
			delete conn.tebakkimia[id];
		}, timeout),
	];
};
handler.help = ["tebakkimia"];
handler.tags = ["game"];
handler.command = /^tebakkimia/i;
handler.onlyprem = true;
handler.game = true;
export default handler;
