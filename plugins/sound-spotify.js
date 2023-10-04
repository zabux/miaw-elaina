import fetch from "node-fetch";
let handler = async (m, { conn, usedPrefix, command, text }) => {
	if (!text)
		return m.reply(
			`Masukan Format Dengan Benar!\n\nContoh:\n${
				usedPrefix + command
			} mantra hujan\n${
				usedPrefix + command
			} https://open.spotify.com/track/5npIL1FmDdtzjLUpLUZ9w7`
		);
	conn.sendReact(m.chat, "🕐", m.key);
	if (!text.startsWith("https://open.spotify.com")) {
		let f = await fetch(
			API("lol", "/api/spotifysearch", { query: text }, "apikey")
		);
		let xx = await f.json();
		let teks = xx.result
			.map((v) => {
				return `
❏ _*Title:*_ ${v.title}
▧ *Artist:* ${v.artists}
▧ *Link:* ${v.link}
`.trim();
			})
			.filter((v) => v)
			.join("\n\n\n");
		await conn.reply(m.chat, teks, m, {
			contextInfo: {
				externalAdReply: {
					showAdAttribution: true,
					mediaType: 1,
					title: "",
					thumbnail: (
						await conn.getFile(
							"https://telegra.ph/file/de2f5bb080ea194d25e07.jpg"
						)
					).data,
					renderLargerThumbnail: true,
					mediaUrl: hwaifu.getRandom(),
					sourceId: wm,
					sourceUrl: "",
				},
			},
		});
		conn.sendReact(m.chat, "", m.key);
	} else {
		let data = await (
			await fetch(API("lol", "/api/spotify", { url: text }, "apikey"))
		).json();
		let caption = `
乂 *${data.result.title}*

❃ *Artist:* ${data.result.artists}
❃ *Duration:* ${data.result.duration}
❃ *Popularity:* ${data.result.popularity}
❃ *Id:* ${data.result.id}

➠ *Url:* https://open.spotify.com/track/${data.result.id}

*L O A D I N G . . .*
`;
		await conn.sendFile(
			m.chat,
			data.result.thumbnail,
			data.result.title + ".jpg",
			caption.trim(),
			m
		);
		await conn.sendFile(
			m.chat,
			data.result.link,
			data.result.title + ".mp3",
			"",
			m,
			{ mimetype: "audio/mp4" }
		);
		conn.sendReact(m.chat, "", m.key);
	}
};
handler.help = ["spotify"].map((v) => v + " <query/urls>");
handler.tags = ["sound"];
handler.command = /^(spotify)$/i;
handler.onlyprem = true;
handler.limit = true;
export default handler;
