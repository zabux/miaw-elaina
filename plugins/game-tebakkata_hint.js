let handler = async (m, { conn }) => {
	conn.tebakkata = conn.tebakkata ? conn.tebakkata : {};
	let id = m.chat;
	if (!(id in conn.tebakkata)) return;
	let json = conn.tebakkata[id][1];
	m.reply(
		"*Clue:* " +
			"```" +
			json.jawaban.replace(/[AIUEOaiueo]/gi, "_") +
			"```" +
			"\n\n*Jangan Balas Chat Ini Tapi Balas Soalnya*"
	);
};
handler.command = /^teka$/i;
handler.limit = true;
export default handler;
