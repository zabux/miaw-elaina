let handler = async (m, { conn }) => {
	conn.tebaklirik = conn.tebaklirik ? conn.tebaklirik : {};
	let id = m.chat;
	if (!(id in conn.tebaklirik)) return;
	let json = conn.tebaklirik[id][1];
	m.reply(
		"*Clue:* " +
			"```" +
			json.result.answer.replace(/[AIUEOaiueo]/gi, "_") +
			"```" +
			"\n\n*Jangan Balas Chat Ini Tapi Balas Soalnya*"
	);
};
handler.command = /^(terik)$/i;
handler.limit = true;
export default handler;
