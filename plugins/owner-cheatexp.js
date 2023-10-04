let handler = async (m, { conn, usedPrefix: _p }) => {
	global.db.data.users[m.sender].exp = Infinity;
	m.reply("Succes");
};
handler.command = /^(cheatexp)$/i;
handler.owner = true;
export default handler;
