let handler = async (m, { conn }) => {
	conn.reply(
		m.chat,
		`_List Group Near_
*Offcial Group*
https://chat.whatsapp.com/FXjFa4zhzCO4nmWw9bDfsc

*Web Topup*
www.ampangpedia.com`,
		m
	);
};
handler.help = ["gcbot"];
handler.tags = ["info"];
handler.command = /^gcbot$/i;

export default handler;
