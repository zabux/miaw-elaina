import similarity from "similarity";
const threshold = 0.72;
export async function before(m) {
	let id = m.chat;
	if (
		!m.quoted ||
		!m.quoted.fromMe ||
		!m.quoted.isBaileys ||
		!m.text ||
		!/Ketik.*terik/i.test(m.quoted.text) ||
		/.*terik/i.test(m.text)
	)
		return !0;
	this.tebaklirik = this.tebaklirik ? this.tebaklirik : {};
	if (!(id in this.tebaklirik)) return m.reply("Soal itu telah berakhir");
	if (m.quoted.id == this.tebaklirik[id][0].id) {
		let isSurrender = /^((me)?nyerah|surr?ender)$/i.test(m.text);
		if (isSurrender) {
			clearTimeout(this.tebaklirik[id][3]);
			delete this.tebaklirik[id];
			return m.reply("*Yah Menyerah :( !*");
		}
		let json = JSON.parse(JSON.stringify(this.tebaklirik[id][1]));
		if (m.text.toLowerCase() == json.result.answer.toLowerCase().trim()) {
			global.db.data.users[m.sender].exp += this.tebaklirik[id][2];
			m.reply(`*Benar!*\n+${this.tebaklirik[id][2]} XP`);
			clearTimeout(this.tebaklirik[id][3]);
			delete this.tebaklirik[id];
		} else if (
			similarity(
				m.text.toLowerCase(),
				json.result.answer.toLowerCase().trim()
			) >= threshold
		)
			m.reply(`*Dikit Lagi!*`);
		else m.reply(`*Salah!*`);
	}
	return !0;
}
export const exp = 0;
