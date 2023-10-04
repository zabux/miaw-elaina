import uploadImage from "../lib/uploadImage.js";

let handler = async (m, { conn, usedPrefix, command }) => {
	conn["unblur_"] = conn["unblur_"] ? conn["unblur_"] : {};
	const q = m.quoted ? m.quoted : m;
	const mime = (q.msg || q).mimetype || q.mediaType || "";
	if (!/image\/(jpe?g|png)/.test(mime)) {
		return m.reply(`reply/send image with caption *${usedPrefix + command}*`);
	}
	if (m.sender in conn["unblur_"]) {
		return m.reply("please wait you have undone job.");
	}
	m.reply("_Progress_");
	conn["unblur_"][m.sender] = true;
	const url = await uploadImage(await q.download());
	try {
		await conn.sendMessage(
			m.chat,
			{
				image: {
					url: API(
						"rose",
						"/image/unblur",
						{
							url,
						},
						"apikey"
					),
				},
			},
			{ quoted: m }
		);
	} catch (e) {
		m.reply("Failed");
	} finally {
		delete conn["unblur_"][m.sender];
	}
};
handler.help = ["remini"];
handler.tags = ["ai"];
handler.premium = true;
handler.command = ["high_enhancer", "remini", "unblur", "enhancer"];
export default handler;
