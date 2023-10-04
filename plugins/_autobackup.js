import moment from "moment-timezone";
import fs from "fs";
let handler = (m) => m;
handler.all = async function (m) {
	let setting = global.db.data.settings[this.user.jid];
	let data = fs.readFileSync("./database.json");
	let d = new Date();
	let date = d.toLocaleDateString("id", {
		day: "numeric",
		month: "long",
		year: "numeric",
	});
	let fdoc = {
		key: { remoteJid: "status@broadcast", participant: "0@s.whatsapp.net" },
		message: { documentMessage: { title: "𝙳 𝙰 𝚃 𝙰 𝙱 𝙰 𝚂 𝙴" } },
	};
	if (setting.backup) {
		if (new Date() * 1 - setting.backupDB > 3600000) {
			await global.db.write();
			this.reply(
				info.nomorown + "@s.whatsapp.net",
				`*🗓️ Database:* ${date}`,
				null
			);
			this.sendMessage(
				info.nomorown + "@s.whatsapp.net",
				{
					document: data,
					mimetype: "application/json",
					fileName: "database.json",
				},
				{ quoted: fdoc }
			);
			setting.backupDB = new Date() * 1;
		}
	}
	return !0;
};
export default handler;
