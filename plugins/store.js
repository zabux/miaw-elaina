let handler = async (m, { conn, usedPrefix }) => {
	let teks = `❏ *_Harga Sewa_*
❃ _15 Hari 7k / Group_
❃ _30 Hari 15k / Group_
❃ _45 Hari 25k / Group_
❃ _60 Hari 35k / Group_
❃ _Permanen 100k / Group_

❏ *_Fitur_*
❃ _Antilink_
❃ _Welcome_
❃ _Enable_
❃ _Store List_
❃ _Promote/Demote_
❃ _HideTag_
❃ _Dan Lain Lain_


❏ *_Harga Premium_*
❃ _15 Hari / 5k_
❃ _30 Hari / 10k_
❃ _45 Hari / 15k_
❃ _60 Hari / 20k_
❃ _Permanen / 50_

❏ *_Fitur_*
❃ _Unlimited Limit_
❃ _Nsfw_
❃ _Bebas Pakai Bot Di Pc_
❃ _Dan Lain Lain_

Minat? Silahkan Chat Owner Dengan Mengetik
${usedPrefix}owner
`.trim();
	await conn.sendFile(m.chat, pay.qris, "qris.jpeg", teks, m, false);
};
handler.help = ["sewa", "premium"];
handler.tags = ["info", "main"];
handler.command = /^(sewa|sewabot|premium|prem)$/i;

export default handler;
