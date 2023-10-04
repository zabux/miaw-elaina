import similarity from "similarity";
const threshold = 0.72;
export async function before(m) {
	let id = m.chat;
	if (
		!m.quoted ||
		!m.quoted.fromMe ||
		!m.quoted.isBaileys ||
		!m.text ||
		!/Ketik.*hgamb/i.test(m.quoted.text) ||
		/.*hgamb/i.test(m.text)
	)
		return !0;
	this.tebakgambar = this.tebakgambar ? this.tebakgambar : {};
	if (!(id in this.tebakgambar)) return m.reply("Soal itu telah berakhir");
	if (m.quoted.id == this.tebakgambar[id][0].id) {
		let isSurrender = /^((me)?nyerah|surr?ender)$/i.test(m.text);
		if (isSurrender) {
			clearTimeout(this.tebakgambar[id][3]);
			delete this.tebakgambar[id];
			return m.reply("*Yah Menyerah :( !*");
		}
		let json = JSON.parse(JSON.stringify(this.tebakgambar[id][1]));
		// m.reply(JSON.stringify(json, null, '\t'))
		if (m.text.toLowerCase() == json.jawaban.toLowerCase().trim()) {
			global.db.data.users[m.sender].exp += this.tebakgambar[id][2];
			m.reply(`*Benar!*\n+${this.tebakgambar[id][2]} XP`);
			clearTimeout(this.tebakgambar[id][3]);
			delete this.tebakgambar[id];
		} else if (
			similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >=
			threshold
		)
			m.reply(`*Dikit Lagi!*`);
		else m.reply(`*Salah!*`);
	}
	return !0;
}
export const exp = 0;
