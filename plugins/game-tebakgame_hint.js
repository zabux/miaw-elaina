let handler = async (m, { conn }) => {
	conn.tebakgame = conn.tebakgame ? conn.tebakgame : {};
	let id = m.chat;
	if (!(id in conn.tebakgame)) return;
	let json = conn.tebakgame[id][1];
	m.reply(
		"*Clue:* " +
			"```" +
			json.jawaban.replace(/[AIUEOaiueo]/gi, "_") +
			"```" +
			"\n\n*Jangan Balas Chat Ini Tapi Balas Soalnya*"
	);
};
handler.command = /^(hgame)$/i;
handler.limit = true;
export default handler;
