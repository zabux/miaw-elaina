import fetch from "node-fetch";
import fs from "fs";

let handler = async (m, { conn, args, usedPrefix, DevMode }) => {
	try {
		let user = global.db.data.users[m.sender];
		global.DATABASE.data.users[m.sender].lastbansos = user.lastbansos || 0;
		let randomaku = `${Math.floor(Math.random() * 101)}`.trim();
		let randomkamu = `${Math.floor(Math.random() * 81)}`.trim(); //hehe Biar Susah Menang :v
		let Aku = randomaku * 1;
		let Kamu = randomkamu * 1;
		let kbansos = "https://telegra.ph/file/afcf9a7f4e713591080b5.jpg";
		let mbansos = "https://telegra.ph/file/d31fcc46b09ce7bf236a7.jpg";
		let botol = wm;
		//let name = conn.getName[m.sender]
		let __timers = new Date() - user.lastbansos;
		let _timers = 604800000 - __timers;
		let timers = clockString(_timers);
		if (user.money < 3000000)
			return m.reply(
				`Uang Anda Harus Diatas 3Juta Untuk Menggunakan Command Ini`
			);
		if (new Date() - user.lastbansos > 300000) {
			if (Aku > Kamu) {
				conn.sendFile(
					m.chat,
					kbansos,
					"korupsi.jpg",
					`Kamu Tertangkap Setelah Kamu korupsi dana bansos🕴️💰,  Dan kamu harus membayar denda 3 Juta rupiah💵`,
					m
				);
				user.money -= 3000000;
				user.lastbansos = new Date() * 1;
			} else if (Aku < Kamu) {
				user.money += 3000000;
				conn.sendFile(
					m.chat,
					mbansos,
					"korupsi.jpg",
					`Kamu berhasil  korupsi dana bansos🕴️💰,  Dan kamu mendapatkan 3 Juta rupiah💵`,
					m
				);
				user.lastbansos = new Date() * 1;
			} else {
				m.reply(
					`Sorry Gan Lu g Berhasil Korupsi bansos Dan Tidak masuk penjara karna kamu *melarikan diri🏃* ${botol}`
				);
				user.lastbansos = new Date() * 1;
			}
		} else
			m.reply(
				`Kamu sudah Melakukan Korupsi Bansos 💰\nDan kamu harus menunggu selama agar bisa korupsi bansos kembali \n▸ 🕓 ${timers}`
			);
	} catch (e) {
		throw `Kok erorr`;
	}
};

handler.help = ["korupsi"];
handler.tags = ["rpg"];
handler.command = /^(bansos|korupsi)$/i;
handler.register = true;
handler.group = true;
handler.rpg = true;
handler.rpg = true;
export default handler;

function pickRandom(list) {
	return list[Math.floor(Math.random() * list.length)];
}
function clockString(ms) {
	let d = isNaN(ms) ? "--" : Math.floor(ms / 86400000);
	let h = isNaN(ms) ? "--" : Math.floor(ms / 3600000) % 24;
	let m = isNaN(ms) ? "--" : Math.floor(ms / 60000) % 60;
	let s = isNaN(ms) ? "--" : Math.floor(ms / 1000) % 60;
	return [
		"\n" + d,
		" *Days ☀️*\n ",
		h,
		" *Hours 🕐*\n ",
		m,
		" *Minute ⏰*\n ",
		s,
		" *Second ⏱️* ",
	]
		.map((v) => v.toString().padStart(2, 0))
		.join("");
}
