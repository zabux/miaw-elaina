import axios from "axios";

let handler = async (m, { conn, args, usedPrefix, command }) => {
	conn.differentMe = conn.differentMe ? conn.differentMe : {};
	if (m.sender in conn.differentMe) {
		return m.reply("Please wait, you have undone job.");
	}
	const q = m.quoted ? m.quoted : m;
	const mime = (q.msg || q).mimetype || q.mediaType || "";
	if (!mime) {
		return m.reply(`Reply/send image with caption *${usedPrefix + command}*`);
	}
	if (!/image\/(jpe?g|png)/.test(mime)) {
		return m.reply(`File not support!`);
	}
	conn["differentMe"][m.sender] = true;
	const styles = ["cg"];
	m.reply(`_Generating ${styles.length} different style_`);

	const imgBuffer = await q.download();
	const form = new FormData();
	const blob = new Blob([imgBuffer], { type: "image/jpg" });
	form.append("file", blob, "image.jpg");

	for (const [index, style] of styles.entries()) {
		const { data } = await axios
			.request({
				baseURL: APIs["rose"], // "https://api.itsrose.site"
				url: "/image/differentMe",
				method: "POST",
				params: {
					style,
					json: true,
					apikey: APIKeys[APIs["rose"]],
				},
				data: form,
			})
			.catch((e) => e?.response);
		const { status, result, message } = data;
		if (status) {
			const caption = `${index + 1}. Style: *${style.replace("_", " ")}*`;
			await conn.sendMessage(
				m.chat,
				{
					image: Buffer.from(result["base64Image"], "base64"),
					caption,
				},
				{ quoted: m }
			);
		}
	}
	delete conn.differentMe[m.sender];
};
handler.help = ["jadiasli"];
handler.tags = ["ai", "anime"];
handler.premium = true;
handler.command = ["jadiasli"];
export default handler;
