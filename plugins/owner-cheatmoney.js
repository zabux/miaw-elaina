let handler = async (m, { conn, usedPrefix: _p }) => {
	global.db.data.users[m.sender].money = Infinity;
	m.reply("Succes");
};
handler.command = /^(cheatuang)$/i;
handler.owner = true;
export default handler;
