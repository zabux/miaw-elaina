let handler = async (m, { conn, command }) => {
	let url = API(
		"https://api.zahwazein.xyz",
		"/randomimage/cosplay",
		null,
		"apikey"
	);
	conn.sendFile(m.chat, url, "cosplay.jpeg", "Ini Dia Kak", m, false);
};
handler.tags = ["anime"];
handler.help = ["cosplay"];
handler.command = /^(cosplay)$/i;
handler.limit = true;
export default handler;
