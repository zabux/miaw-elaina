let handler = async (m, { conn }) => {
	conn.tebaklagu = conn.tebaklagu ? conn.tebaklagu : {};
	let id = m.chat;
	if (!(id in conn.tebaklagu)) return;
	let json = conn.tebaklagu[id][1];
	m.reply(
		"*Clue:* " +
			"```" +
			json.judul.replace(/[AIUEOaiueo]/gi, "_") +
			"```" +
			"\n\n*Jangan Balas Chat Ini Tapi Balas Soalnya*"
	);
};
handler.command = /^hlagu$/i;
handler.limit = true;
export default handler;
