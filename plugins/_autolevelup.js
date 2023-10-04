import { canLevelUp, xpRange } from "../lib/levelling.js";
import { levelup } from "../lib/canvas.js";
import moment from "moment-timezone";
export async function before(m, { conn }) {
	let user = db.data.users[m.sender];
	let chat = db.data.chats[m.chat];
	if (chat.isBanned) return !0;
	if (
		canLevelUp(user.level, user.exp, global.multiplier) &&
		chat.autolevelup &&
		m.isGroup
	) {
		let before = user.level * 1;
		while (canLevelUp(user.level, user.exp, global.multiplier)) user.level++;
		if (before !== user.level) {
			let teks = `.             ${user.role}`;
			let str = `
*🎉 C O N G R A T S 🎉*
*${before}* ➔ *${user.level}* [ *${user.role}* ]

*Note:* _Semakin sering berinteraksi dengan bot Semakin Tinggi level kamu_
`.trim();
			try {
				let img = await levelup(teks, user.level);
				await conn.sendFile(m.chat, img, "levelup.jpg", str, m);
			} catch (e) {
				let img = await levelup(teks, user.level);
				await conn.sendFile(m.chat, img, "levelup.jpg", str, m);
			}
		}
	}
	return !0;
}
function wish() {
	let wishloc = "";
	const time = moment.tz("Asia/Jakarta").format("HH");
	wishloc = "Hi";
	if (time >= 0) {
		wishloc = "Selamat Malam";
	}
	if (time >= 4) {
		wishloc = "Selamat Pagi";
	}
	if (time >= 11) {
		wishloc = "Selamat Siang";
	}
	if (time >= 15) {
		wishloc = "Selamat Sore";
	}
	if (time >= 18) {
		wishloc = "Selamat Malam";
	}
	if (time >= 23) {
		wishloc = "Selamat Malam";
	}
	return wishloc;
}
