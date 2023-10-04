let handler = async (m, { conn, text, isOwner }) => {
	if (!isOwner) return m.reply("Sementara Fitur Ini Tidak Dapat Digunakan!");
	if (!text) return conn.reply(m.chat, "Masukan Teks yang akan dispam!", m);
	let pesan = `${text}`;
	await m.reply("*SPAM DIMULAI!*\n\nNote : Bot akan spam 30 kali");
	await m.reply(pesan);
	await m.reply(pesan);
	await m.reply(pesan);
	await m.reply(pesan);
	await m.reply(pesan);
	await m.reply(pesan);
	await m.reply(pesan);
	await m.reply(pesan);
	await m.reply(pesan);
	await m.reply(pesan);
	await m.reply(pesan);
	await m.reply(pesan);
	await m.reply(pesan);
	await m.reply(pesan);
	await m.reply(pesan);
	await m.reply(pesan);
	await m.reply(pesan);
	await m.reply(pesan);
	await m.reply(pesan);
	await m.reply(pesan);
	await m.reply(pesan);
	await m.reply(pesan);
	await m.reply(pesan);
	await m.reply(pesan);
	await m.reply(pesan);
	await m.reply(pesan);
	await m.reply(pesan);
	await m.reply(pesan);
	await m.reply(pesan);

	conn.reply(m.chat, "�Akhir Dari Spam", m);
};
handler.help = ["groupspam"].map((v) => v + " <teks>");
handler.tags = ["group"];
handler.command = /^(groupspam)$/i;

handler.premium = true;

export default handler;
