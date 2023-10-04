import db from "../lib/database.js";
import moment from "moment-timezone";
import fs from "fs";
let handler = async (
	m,
	{ conn, usedPrefix, command, args, isOwner, isAdmin, isROwner }
) => {
	let isEnable = /true|enable|(turn)?on|1/i.test(command);
	let chat = global.db.data.chats[m.chat];
	let d = new Date(new Date() + 3600000);
	let locale = "id";
	let weton = ["Pahing", "Pon", "Wage", "Kliwon", "Legi"][
		Math.floor(d / 84600000) % 5
	];
	let week = d.toLocaleDateString(locale, {
		weekday: "long",
	});
	let date = d.toLocaleDateString(locale, {
		day: "numeric",
		month: "long",
		year: "numeric",
	});
	let wibh = moment.tz("Asia/Jakarta").format("HH");
	let wibm = moment.tz("Asia/Jakarta").format("mm");
	let wibs = moment.tz("Asia/Jakarta").format("ss");
	let wktuwib = `${wibh} H ${wibm} M ${wibs} S`;
	let user = global.db.data.users[m.sender];
	let bot = global.db.data.settings[conn.user.jid] || {};
	let type = (args[0] || "").toLowerCase();
	let isAll = false,
		isUser = false;
	let caption = `
_*❏ List Command Enable/Disable*_

*❏ Admin Only*
▧ antilink
▧ antilinkwa
▧ antitoxic
▧ antibadword
▧ antidelete
▧ antiviewonce
▧ antisticker
▧ antivirtex
▧ antispamlink
▧ simi
▧ text
▧ restrict
▧ game
▧ rpg
▧ nsfw
▧ welcome
▧ autodelvn
▧ autolevelup

*❏ Owner Only*
▧ autobackup
▧ autocleartmp
▧ whitelistmycontacts
▧ autoread
▧ composing
▧ gconly
▧ pconly
▧ self
▧ public
▧ swonly
▧ anticall
`.trim();
	switch (type) {
		case "welcome":
			if (m.isGroup) {
				if (!(isAdmin || isOwner)) {
					global.dfail("admin", m, conn);
					throw false;
				}
			}
			chat.welcome = isEnable;
			break;
		case "autolevelup":
			if (m.isGroup) {
				if (!(isAdmin || isOwner)) {
					global.dfail("admin", m, conn);
					throw false;
				}
			}
			chat.autolevelup = isEnable;
			break;
		case "detect":
			if (m.isGroup) {
				if (!(isAdmin || isOwner)) {
					global.dfail("admin", m, conn);
					throw false;
				}
			}
			chat.detect = isEnable;
			break;
		case "delete":
			if (m.isGroup) {
				if (!(isAdmin || isOwner)) {
					global.dfail("admin", m, conn);
					throw false;
				}
			}
			chat.delete = isEnable;
			break;
		case "antiviewonce":
			if (m.isGroup) {
				if (!(isAdmin || isOwner)) {
					global.dfail("admin", m, conn);
					throw false;
				}
			}
			chat.viewonce = isEnable;
			break;
		case "antidelete":
			if (m.isGroup) {
				if (!(isAdmin || isOwner)) {
					global.dfail("admin", m, conn);
					throw false;
				}
			}
			chat.delete = !isEnable;
			break;
		case "antispamlink":
			if (m.isGroup) {
				if (!(isAdmin || isOwner)) {
					global.dfail("admin", m, conn);
					throw false;
				}
			}
			chat.antispam = isEnable;
			break;
		case "text":
			if (m.isGroup) {
				if (!(isAdmin || isOwner)) {
					global.dfail("admin", m, conn);
					throw false;
				}
			}
			chat.teks = isEnable;
			break;
		case "autodelvn":
			if (m.isGroup) {
				if (!(isAdmin || isOwner)) {
					global.dfail("admin", m, conn);
					throw false;
				}
			}
			chat.autodelvn = isEnable;
			break;
		case "public":
			isAll = true;
			if (!isROwner) {
				global.dfail("rowner", m, conn);
				throw false;
			}
			global.opts["self"] = !isEnable;
			break;
		case "antilink":
			if (m.isGroup) {
				if (!(isAdmin || isOwner)) {
					global.dfail("admin", m, conn);
					throw false;
				}
			}
			chat.antiLink = isEnable;
			break;
		case "antilinkwa":
			if (m.isGroup) {
				if (!(isAdmin || isOwner)) {
					global.dfail("admin", m, conn);
					throw false;
				}
			}
			chat.antiLinkWa = isEnable;
			break;
		case "nsfw":
			if (m.isGroup) {
				if (!(isAdmin || isOwner)) {
					global.dfail("admin", m, conn);
					throw false;
				}
			}
			chat.nsfw = isEnable;
			break;
		case "rpg":
			if (m.isGroup) {
				if (!(isAdmin || isOwner)) {
					global.dfail("admin", m, conn);
					throw false;
				}
			}
			chat.rpg = isEnable;
			break;
		case "antivirtex":
			if (m.isGroup) {
				if (!(isAdmin || isOwner)) {
					global.dfail("admin", m, conn);
					throw false;
				}
			}
			chat.antiVirtex = isEnable;
			break;
		case "simi":
			if (!(isAdmin || isOwner)) {
				global.dfail("admin", m, conn);
				throw false;
			}
			chat.simi = isEnable;
			break;
		case "composing":
			if (!isROwner) {
				global.dfail("rowner", m, conn);
				throw false;
			}
			bot.composing = isEnable;
			break;
		case "antisticker":
			if (m.isGroup) {
				if (!(isAdmin || isOwner)) {
					global.dfail("admin", m, conn);
					throw false;
				}
			}
			chat.antiSticker = isEnable;
			break;
		case "antibadword":
			if (m.isGroup) {
				if (!(isAdmin || isOwner)) {
					global.dfail("admin", m, conn);
					throw false;
				}
			}
			chat.antiBadword = isEnable;
			break;
		case "antitoxic":
			if (m.isGroup) {
				if (!(isAdmin || isOwner)) {
					global.dfail("admin", m, conn);
					throw false;
				}
			}
		case "restrict":
			if (m.isGroup) {
				if (!(isAdmin || isOwner)) {
					global.dfail("admin", m, conn);
					throw false;
				}
			}
			chat.pembatasan = isEnable;
			break;
		case "game":
			if (m.isGroup) {
				if (!(isAdmin || isOwner)) {
					global.dfail("admin", m, conn);
					throw false;
				}
			}
			chat.game = isEnable;
			break;
		case "anticall":
			if (m.isGroup) {
				if (!(isAdmin || isOwner)) {
					global.dfail("admin", m, conn);
					throw false;
				}
			}
			chat.antiCall = isEnable;
			break;
		case "whitelistmycontacts":
			if (!isOwner) {
				global.dfail("owner", m, conn);
				throw false;
			}
			conn.callWhitelistMode = isEnable;
			break;
		case "autobackup":
			isAll = true;
			if (!isOwner) {
				global.dfail("owner", m, conn);
				throw false;
			}
			bot.backup = isEnable;
			break;
		case "autocleartmp":
			isAll = true;
			if (!isOwner) {
				global.dfail("owner", m, conn);
				throw false;
			}
			bot.cleartmp = isEnable;
			break;
		case "autoread":
			isAll = true;
			if (!isROwner) {
				global.dfail("rowner", m, conn);
				throw false;
			}
			bot.autoread = isEnable;
			break;
		case "pconly":
			isAll = true;
			if (!isROwner) {
				global.dfail("rowner", m, conn);
				throw false;
			}
			global.opts["pconly"] = isEnable;
			break;
		case "gconly":
			isAll = true;
			if (!isROwner) {
				global.dfail("rowner", m, conn);
				throw false;
			}
			bot.gconly = isEnable;
			break;
		case "swonly":
			isAll = true;
			if (!isROwner) {
				global.dfail("rowner", m, conn);
				throw false;
			}
			global.opts["swonly"] = isEnable;
			break;
		default:
			if (!/[01]/.test(command))
				return await conn.reply(m.chat, caption, m, {
					contextInfo: {
						externalAdReply: {
							showAdAttribution: true,
							mediaType: 1,
							title: "",
							thumbnail: fs.readFileSync("./media/thumbnail.jpg"),
							renderLargerThumbnail: true,
							mediaUrl: hwaifu.getRandom(),
							sourceId: wm,
							sourceUrl: "",
						},
					},
				});
			throw false;
	}
	await m.reply(
		`${type} berhasil ${isEnable ? "dinyalakan" : "dimatikan"} untuk ${
			isAll ? "bot ini" : "chat ini"
		} !`
	);
};
handler.help = ["enable *<command>*"];
handler.tags = ["group", "adminry"];
handler.command =
	/^((en|dis)able|setting|settings|(tru|fals)e|(turn)?o(n|ff)|[01])$/i;

export default handler;
