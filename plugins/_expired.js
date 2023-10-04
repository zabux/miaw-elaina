let handler = (m) => m;
handler.before = async function (m) {
	if (m.isGroup && global.db.data.chats[m.chat].expired != 0) {
		if (new Date() * 1 >= global.db.data.chats[m.chat].expired) {
			this.reply(
				m.chat,
				`? waktunya *${this.user.name}* untuk meninggalkan grup\n? Jangan lupa sewa lagi ya!`,
				null
			).then(() => {
				conn.sendContact(m.chat, global.owner, m).then(() => {
					this.groupLeave(m.chat).then(() => {
						global.db.data.chats[m.chat].expired = 0;
					});
				});
			});
		}
	}
};

export default handler;
