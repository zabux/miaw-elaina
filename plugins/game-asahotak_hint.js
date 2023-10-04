let handler = async (m, { conn }) => {
	conn.asahotak = conn.asahotak ? conn.asahotak : {};
	let id = m.chat;
	if (!(id in conn.asahotak)) throw false;
	let json = conn.asahotak[id][1];
	m.reply(
		"*Clue:* " +
			"```" +
			json.jawaban.replace(/[AIUEOaiueo]/gi, "_") +
			"```" +
			"\n\n*Jangan Balas Chat Ini Tapi Balas Soalnya*"
	);
};
handler.command = /^hotak$/i;
handler.limit = true;
export default handler;
