let handler = async (m, { conn }) => {
	conn.tebaktebakan = conn.tebaktebakan ? conn.tebaktebakan : {};
	let id = m.chat;
	if (!(id in conn.tebaktebakan)) return;
	let json = conn.tebaktebakan[id][1];
	m.reply(
		"*Clue:* " +
			"```" +
			json.jawaban.replace(/[AIUEOaiueo]/gi, "_") +
			"```" +
			"\n\n*Jangan Balas Chat Ini Tapi Balas Soalnya*"
	);
};
handler.command = /^hkan$/i;
handler.limit = true;
export default handler;
