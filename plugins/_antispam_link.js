const linkRegex = /chat.whatsapp.com\/(?:invite\/)?([0-9A-Za-z]{20,24})/i;
const isLinkWa = /wa.me/i;
export async function all(m, { isBotAdmin }) {
	if (!m.message) return;
	if (!isBotAdmin) return;
	if (m.chat.endsWith("broadcast") || m.fromMe) return;
	let chat = global.db.data.chats[m.chat];
	let isGroupLink = linkRegex.exec(m.text);
	let isAntiLinkWa = isLinkWa.exec(m.text);
	this.spamlink = this.spamlink ? this.spamlink : {};
	if (m.sender in this.spamlink) {
		if (isGroupLink && chat.antiLink && chat.antispam) {
			this.spamlink[m.sender].count++;
			if (
				m.messageTimestamp.toNumber() - this.spamlink[m.sender].lastspam >=
				10
			) {
				if (this.spamlink[m.sender].count >= 5) {
					m.reply(
						"*Kamu Terdeteksi Spam Link Group Lebih Dari 5x Maka Kamu Akan Di Kick*"
					);
					await conn.groupParticipantsUpdate(m.chat, [m.sender], "remove");
				}
				this.spamlink[m.sender].count = 0;
				this.spamlink[m.sender].lastspam = m.messageTimestamp.toNumber();
			}
		}
		if (isAntiLinkWa && chat.antiLinkWa && chat.antispam) {
			this.spamlink[m.sender].count++;
			if (
				m.messageTimestamp.toNumber() - this.spamlink[m.sender].lastspam >=
				10
			) {
				if (this.spamlink[m.sender].count >= 5) {
					m.reply(
						"*Kamu Terdeteksi Spam Link Whatsapp Lebih Dari 5x Maka Kamu Akan Di Kick*"
					);
					await conn.groupParticipantsUpdate(m.chat, [m.sender], "remove");
				}
				this.spamlink[m.sender].count = 0;
				this.spamlink[m.sender].lastspam = m.messageTimestamp.toNumber();
			}
		}
	} else
		this.spamlink[m.sender] = {
			jid: m.sender,
			count: 0,
			lastspam: 0,
		};
}
