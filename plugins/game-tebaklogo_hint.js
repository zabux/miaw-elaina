let handler = async (m, { conn }) => {
	conn.tebaklogo = conn.tebaklogo ? conn.tebaklogo : {};
	let id = m.chat;
	if (!(id in conn.tebaklogo)) return;
	let json = conn.tebaklogo[id][1];
	m.reply(
		"*Clue:* " +
			"```" +
			json.jawaban.replace(/[AIUEOaiueo]/gi, "_") +
			"```" +
			"\n\n*Jangan Balas Chat Ini Tapi Balas Soalnya*"
	);
};
handler.command = /^hlogo$/i;
handler.limit = true;
export default handler;
