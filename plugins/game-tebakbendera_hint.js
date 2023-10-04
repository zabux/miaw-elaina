let handler = async (m, { conn }) => {
	conn.tebakbendera = conn.tebakbendera ? conn.tebakbendera : {};
	let id = m.chat;
	if (!(id in conn.tebakbendera)) return;
	let json = conn.tebakbendera[id][1];
	m.reply(
		"*Clue:* " +
			"```" +
			json.name.replace(/[AIUEOaiueo]/gi, "_") +
			"```" +
			"\n\n*Jangan Balas Chat Ini Tapi Balas Soalnya*"
	);
};
handler.command = /^(teben)$/i;
handler.limit = true;
export default handler;
