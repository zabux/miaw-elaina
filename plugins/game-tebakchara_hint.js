let handler = async (m, { conn }) => {
	conn.tebakchara = conn.tebakchara ? conn.tebakchara : {};
	let id = m.chat;
	if (!(id in conn.tebakchara)) return;
	let json = conn.tebakchara[id][1];
	m.reply(
		"*Clue:* " +
			"```" +
			json.name.replace(/[AIUEOaiueo]/gi, "_") +
			"```" +
			"\n\n*Jangan Balas Chat Ini Tapi Balas Soalnya*"
	);
};
handler.command = /^hcha$/i;
handler.limit = true;
export default handler;
