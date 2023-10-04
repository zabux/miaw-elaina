let handler = async (m, { conn }) => {
	conn.tebakgambar = conn.tebakgambar ? conn.tebakgambar : {};
	let id = m.chat;
	if (!(id in conn.tebakgambar)) throw false;
	let json = conn.tebakgambar[id][1];
	m.reply(
		"*Clue:* " +
			"```" +
			json.jawaban.replace(/[AIUEOaiueo]/gi, "_") +
			"```" +
			"\n\n*Jangan Balas Chat Ini Tapi Balas Soalnya*"
	);
};
handler.command = /^hgamb$/i;

handler.limit = true;

export default handler;
