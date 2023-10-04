// Source https://github.com/sadteams/bot-md
const delay = (time) => new Promise((res) => setTimeout(res, time));
let handler = async (m, { conn }) => {
	conn.p = conn.p ? conn.p : {};
	let id = m.chat;
	conn.p[id] = [await conn.sendContact(m.chat, global.owner, m)];
	await delay(100);
	return conn.sendMessage(
		m.chat,
		{
			text: `Hallo Kak @${
				m.sender.split("@")[0]
			}, Itu Nomor Ownerku Jangan Di Spam Ya!`,
			mentions: [m.sender],
		},
		{ quoted: conn.p[id][0] }
	);
	await delay(100);
	return delete conn.p[id];
};

handler.help = ["owner"];
handler.tags = ["info"];
handler.command = /^(owner|creator)$/i;

export default handler;
