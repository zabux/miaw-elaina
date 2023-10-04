let handler = async (m, { conn }) => {
	global.db.data.users[m.sender].limit = Infinity;
	m.reply("Succes");
};
handler.command = /^(cheatlimit)$/i;
handler.owner = true;
export default handler;
