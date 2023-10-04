import fs from "fs";
import fetch from "node-fetch";

let handler = async (m, { conn, text, participants, usedPrefix: _p }) => {
	let [number, pesan, boddy] = text.split`|`;
	let users = participants.map((u) => conn.decodeJid(u.id));

	let td =
		"application/vnd.openxmlformats-officedocument.wordprocessingml.document";

	if (!number)
		return conn.reply(m.chat, "Silahkan masukan id grup yang akan dikirim", m);
	if (!pesan) return conn.reply(m.chat, "Silahkan masukan pesannya", m);
	if (text > 500) return conn.reply(m.chat, "Teks Kepanjangan!", m);

	let user = global.db.data.users[m.sender];

	let korban = `${number}`;
	var nomor = m.sender;
	let spam1 = `「 *MIAW BOT* 」\n\nDari : Owner\nKe : ${korban}@g.us\nPesan : ${pesan}\n\n${global.wm}`;

	await conn.reply(korban + "@g.us", spam1, 0, { mentions: users });

	{
		let logs = `[!] Berhasil mengirim pesan wa ke id grup ${korban}`;
		conn.reply(m.chat, logs, m);
	}
};
handler.help = ["gcemail"];
handler.tags = ["owner"];
handler.command = /^(gcemail)$/i;
handler.owner = true;
export default handler;
