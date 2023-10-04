let handler = async (m, { conn, usedPrefix: _p }) => {
	global.db.data.users[m.sender].level = Infinity;
	m.reply("Succes");
};
handler.command = /^(cheatlevel)$/i;
handler.owner = true;
export default handler;
