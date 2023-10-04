import { otakudesu } from "@xct007/frieren-scraper";
import fetch from "node-fetch";
import axios from "axios";
let handler = async (m, { conn, usedPrefix, command, text }) => {
	if (!text && !/otakulatest|otakudesulatest|otakudesu-latest/i.test(command))
		throw "Masukan Judul Anime/Link Otakudesu!";
	try {
		if (/otakulatest|otakudesulatest|otakudesu-latest/i.test(command)) {
			let result = await otakudesu.latest();
			let teks = result
				.map((v) => {
					return `
❏ *Title:* ${v.title}
▧ *Hari:* ${v.day}
▧ *Tanggal:* ${v.date}

▧ *Url:* ${v.url}
`.trim();
				})
				.filter((v) => v)
				.join("\n\n");
			await conn.reply(m.chat, teks, m, {
				contextInfo: {
					externalAdReply: {
						showAdAttribution: true,
						mediaType: 1,
						title: "",
						thumbnail: await (
							await fetch("https://telegra.ph/file/1a7d43b683f952ebcc7e4.jpg")
						).buffer(),
						renderLargerThumbnail: true,
						mediaUrl: hwaifu.getRandom(),
						sourceId: wm,
						sourceUrl: "",
					},
				},
			});
		} else if (text.startsWith("https://otakudesu.lol/anime")) {
			let result = await otakudesu.detail(text);
			let caption = result.url.episodes
				.map((v) => {
					return `
❏ *Title:* ${v.title}
▧ *Url:* ${v.url}
`.trim();
				})
				.join("\n\n");
			let teks = `❃ _*Title:*_ ${result.judul}
❃ _*Score:*_ ${result.skor}
❃ _*Produser:*_ ${result.produser}
❃ _*Status:*_ ${result.status}
❃ _*Total Eps:*_ ${result.total_episode}
❃ _*Durasi:*_ ${result.durasi}
❃ _*Tanggal Rilis:*_ ${result.tanggal_rilis}
❃ _*Studio:*_ ${result.studio}
❃ _*Genre:*_ ${result.genre}
`.trim();
			await conn.sendFile(
				m.chat,
				result.thumbnail,
				"thumbnail.jpeg",
				teks,
				m,
				false
			);
			await delay(2000);
			await conn.reply(m.chat, caption, m, {
				contextInfo: {
					externalAdReply: {
						showAdAttribution: true,
						mediaType: 1,
						title: "",
						thumbnail: await (
							await fetch("https://telegra.ph/file/1a7d43b683f952ebcc7e4.jpg")
						).buffer(),
						renderLargerThumbnail: true,
						mediaUrl: hwaifu.getRandom(),
						sourceId: wm,
						sourceUrl: "",
					},
				},
			});
		} else if (text.startsWith("https://otakudesu.lol/episode")) {
			let result = await otakudesu.detail(text);
			let d1 = await originalUrl(
				result.urls["360p"]
					? result.urls["360p"][4].url
					: result.urls["Mp4 360p"][4].url
			);
			let d2 = await originalUrl(
				result.urls["480p"]
					? result.urls["480p"][4].url
					: result.urls["Mp4 480p"][4].url
			);
			let d3 = await originalUrl(
				result.urls["720p"]
					? result.urls["720p"][4].url
					: result.urls["Mp4 720p"][4].url
			);
			let caption = `
❏ *Download Resolusi 360p:*
▧ Link: ${d1}

❏ *Download Resolusi 480p:*
▧ Link: ${d2} ${
				db.data.users[m.sender].premiumTime > 0
					? `

❏ *Download Resolusi 720p:*
▧ Link: ${d3}`
					: ""
			}

––––––––––––––––––––––

❏ *Cara Mendownload Anime:*
${usedPrefix}mega ${d1}
`.trim();
			await conn.reply(m.chat, caption, m, {
				contextInfo: {
					externalAdReply: {
						showAdAttribution: true,
						mediaType: 1,
						title: "",
						thumbnail: await (
							await fetch("https://telegra.ph/file/1a7d43b683f952ebcc7e4.jpg")
						).buffer(),
						renderLargerThumbnail: true,
						mediaUrl: hwaifu.getRandom(),
						sourceId: wm,
						sourceUrl: "",
					},
				},
			});
		} else {
			let result = await otakudesu.search(text);
			let teks = result
				.map((v) => {
					return `
❏ *Title:* ${v.title}
▧ *Status:* ${v.status}
▧ *Genre:* ${v.genres}
▧ *Link:* ${v.url}`.trim();
				})
				.filter((v) => v)
				.join("\n\n\n");
			await conn.reply(m.chat, teks, m, {
				contextInfo: {
					externalAdReply: {
						showAdAttribution: true,
						mediaType: 1,
						title: "",
						thumbnail: await (
							await fetch("https://telegra.ph/file/1a7d43b683f952ebcc7e4.jpg")
						).buffer(),
						renderLargerThumbnail: true,
						mediaUrl: hwaifu.getRandom(),
						sourceId: wm,
						sourceUrl: "",
					},
				},
			});
		}
	} catch (e) {
		throw "Terjadi Error, Silahkan Coba lagi";
	}
};
handler.help = ["otakudesu", "otakudesu-latest"];
handler.tags = ["anime"];
handler.command = /^(otakudesu|otakudesu-latest|otakudesulatest|otakulatest)$/i;
handler.limit = true;
export default handler;

async function originalUrl(url) {
	return (await axios(url)).request.res.responseUrl;
}

const delay = (time) => new Promise((res) => setTimeout(res, time));
