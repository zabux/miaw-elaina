const linkRegex = /chat.whatsapp.com\/(?:invite\/)?([0-9A-Za-z]{20,24})/i;
export async function before(m, { isAdmin, isBotAdmin }) {
	if (m.isBaileys && m.fromMe) return !0;
	if (!m.isGroup) return !1;
	let chat = global.db.data.chats[m.chat];
	let bot = global.db.data.settings[this.user.jid] || {};
	const isGroupLink = linkRegex.exec(m.text);

	if (chat.antiLink && isGroupLink && !isAdmin) {
		if (isBotAdmin) {
			const linkThisGroup = `https://chat.whatsapp.com/${await this.groupInviteCode(
				m.chat
			)}`;
			if (m.text.includes(linkThisGroup)) return !0;
		}
		if (chat.teks) {
			await m.reply(
				`_*乂 Link Group Terdeteksi!*_ ${
					chat.pembatasan
						? "\n_pesan kamu akan di hapus!_"
						: "\n_pesan kamu akan dihapus dan kamu akan dikick!_"
				} ${isBotAdmin ? "" : "\n\n_❬Bot Bukan Admin❭_"}`
			);
		}
		if (isBotAdmin && !chat.pembatasan) {
			await conn.sendMessage(m.chat, { delete: m.key });
			await conn.groupParticipantsUpdate(m.chat, [m.sender], "remove");
		} else if (chat.pembatasan && isBotAdmin) {
			await conn.sendMessage(m.chat, { delete: m.key });
		}
	}
	return !0;
}
