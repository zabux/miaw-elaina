import axios from "axios";

let handler = async (m, { conn, args, usedPrefix, command }) => {
	// Create temporary variable in conn; queque, to avoid spam.
	conn.differentMe = conn.differentMe ? conn.differentMe : {};

	if (m.sender in conn.differentMe) {
		return m.reply("Please wait, you have undone job.");
	}

	const q = m.quoted ? m.quoted : m;
	const mime = (q.msg || q).mimetype || q.mediaType || "";
	if (!mime) {
		return m.reply(`reply/send image with caption *${usedPrefix + command}*`);
	}

	// supported image mimetype is JPG/JPEG/PNG
	if (!/image\/(jpe?g|png)/.test(mime)) {
		return m.reply(`Unsupported file!`);
	}

	// assign user to temporary variable; queque, to avoid spam.
	conn["differentMe"][m.sender] = true;

	// Example used styles.
	const styles = ["anime", "comic"];

	// send text to user; if the image is being generate
	m.reply(`_Generating ${styles.length} different style_`);

	// Find your way to get image buffer
	const imgBuffer = await q.download();

	// Using node version 18x (IMPORTANT !)
	const form = new FormData();
	const blob = new Blob([imgBuffer], { type: "image/jpg" });
	form.append("file", blob, "image.jpg");

	/** or using module form-data; CommonJS
	const formData = require("form-data");
	const form = new formData

	form.append("file", Buffer.from(imgBuffer), {
		contentType: "image/jpg",
		filename: "image.jpg"
	})
	*/

	/**
	 * You can use { json: true } in object data
	 * or set { responseType: "arrabuffer" } in axios options.
	 */
	for (const [index, style] of styles.entries()) {
		const { data, status: statusCode } = await axios
			.request({
				baseURL: APIs["rose"], // "https://api.itsrose.life"
				url: "/image/differentMe",
				method: "POST",
				params: {
					style,
					json: true, // false
					apikey: APIKeys[APIs["rose"]],
				},
				data: form,
				// responseType: "arrabuffer"
			})
			.catch((e) => e?.response);
		/**
		if (statusCode !== 200) {
			m.reply("Your custom error message");
			break;
		}
		*/
		const { status, result, message } = data;

		if (!status) {
			// Break for loop if api response status false
			await conn.sendMessage(
				m.chat,
				{
					text: "_Generating Stop_",
				},
				{ quoted: m }
			);
			break;
		}
		if (result["is_nsfw"]) {
			// Break the loop if the image response is nsfw.
			await conn.sendMessage(
				m.chat,
				{
					image: Buffer.from(result["base64Image"], "base64"),
					caption: "_Generating Stop_",
				},
				{ quoted: m }
			);
			break;
		}
		const caption = `${index + 1}. Style: *${style.replace("_", " ")}*`;

		// Send the base64 image to client.
		await conn.sendMessage(
			m.chat,
			{
				image: Buffer.from(result["base64Image"], "base64"),
				caption,
			},
			{ quoted: m }
		);
	}
	// remove the user from queque
	delete conn.differentMe[m.sender];
};
handler.help = ["differentme"];
handler.tags = ["ai"];
handler.premium = ["true"];
handler.command = ["differentme"];
handler.group = false;

export default handler;
