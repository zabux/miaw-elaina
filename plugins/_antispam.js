export async function all(m) {
	let user = db.data.users[m.sender];
	let chat = db.data.chats[m.chat];
	if (
		(m.chat.endsWith("broadcast") || m.fromMe) &&
		!m.message &&
		!chat.isBanned
	)
		return;
	if (
		!m.text.startsWith(".") &&
		!m.text.startsWith("#") &&
		!m.text.startsWith("!")
	)
		return;
	if (user.banned) return;
	this.spam = this.spam ? this.spam : {};
	if (m.sender in this.spam) {
		this.spam[m.sender].count++;
		if (m.messageTimestamp.toNumber() - this.spam[m.sender].lastspam >= 4) {
			if (this.spam[m.sender].count >= 2) {
				user.banned = true;
				m.reply(
					"*乂 Spam Command Terdeteksi!*\n\nSilahkan Tunggu 5 Detik Untuk Menggunakan Command Kembali"
				);
				var detik = 10000 * 1;
				var now = new Date() * 1;
				if (now < user.lastBanned) user.lastBanned += detik;
				else user.lastBanned = now + detik;
			}
			this.spam[m.sender].count = 0;
			this.spam[m.sender].lastspam = m.messageTimestamp.toNumber();
		}
	} else
		this.spam[m.sender] = {
			jid: m.sender,
			count: 0,
			lastspam: 0,
		};
}
