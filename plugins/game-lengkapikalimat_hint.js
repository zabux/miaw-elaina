let handler = async (m, { conn }) => {
	conn.lengkapikalimat = conn.lengkapikalimat ? conn.lengkapikalimat : {};
	let id = m.chat;
	if (!(id in conn.lengkapikalimat)) throw false;
	let json = conn.lengkapikalimat[id][1];
	m.reply(
		"*Clue:* " +
			"```" +
			json.jawaban.replace(/[AIUEOaiueo]/gi, "_") +
			"```" +
			"\n\n*Jangan Balas Chat Ini Tapi Balas Soalnya*"
	);
};
handler.command = /^hlen$/i;
handler.limit = true;
export default handler;
