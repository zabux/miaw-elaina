let handler = async (m, { conn }) => {
	conn.tebakkimia = conn.tebakkimia ? conn.tebakkimia : {};
	let id = m.chat;
	if (!(id in conn.tebakkimia)) return;
	let json = conn.tebakkimia[id][1];
	m.reply(
		"*Clue:* " +
			"```" +
			json.unsur.replace(/[AIUEOaiueo]/gi, "_") +
			"```" +
			"\n\n*Jangan Balas Chat Ini Tapi Balas Soalnya*"
	);
};
handler.command = /^hmia$/i;
handler.limit = true;
export default handler;
