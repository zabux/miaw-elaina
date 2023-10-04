import axios from "axios";
import uploadImage from "../lib/uploadImage.js";

let handler = async (m, { conn, usedPrefix, text: prompt, command }) => {
	if (!prompt) {
		return m.reply(
			`Example: *${usedPrefix + command}* 1girl, solo, ponytail, blush.`
		);
	}
	conn.animedif = conn.animedif ? conn.animedif : {};
	if (m.sender in conn.animedif) {
		return m.reply("You have undone job, please wait...");
	}
	conn.animedif[m.sender] = true;

	m.reply("_Progress..._");
	let url;
	const q = m.quoted ? m.quoted : m;
	const mime = (q.msg || q).mimetype || q.mediaType || "";
	if (/image\/(jpe?g|png)/.test(mime)) {
		url = await uploadImage(await q.download?.());
	}
	try {
		const sampler = "Euler a";
		const steps = 40;
		const style = "ACG";
		const ratio = "9:16";
		const controlNet = url ? "scribble" : "none";
		const cfg = 7;
		const image_num = 1;
		const init_image = url ? "True" : "None";
		const negative_prompt =
			"((NSFW)), naked, nude, no clothes, upper body uncovered, breast uncovered, (worst quality, low quality, extra digits:1.4), artist name, nsfw, monochrome, fused face, poorly drawn face, cloned face, false body, false face, bad hands, poorly drawn hands, extra fingers, fused eyes, poorly drawn eyes, liquid eyes, false eyes, scary, ugly, out of frame, head out of frame, bad anatomy";
		const tun = true;

		const { data } = await axios
			.request({
				baseURL: APIs["rose"], // https://api.itsrose.life
				url: "/image/diffusion",
				method: "GET",
				// TODO: post in API
				params: {
					prompt,
					style,
					ratio,
					sampler,
					...(url ? { init_image: url } : {}),
					cfg,
					controlNet,
					steps,
					image_num,
					negative_prompt,
					apikey: APIKeys[APIs["rose"]],
				},
			})
			.catch((e) => e?.response);

		const { status, message, result } = data;
		const { images } = result;
		if (!status) {
			delete conn["animedif"][m.sender];
			return m.reply(message);
		}
		const caption =
			`_Style_: *_${style}_*
_Ratio_: *_${ratio}_*
_ControlNet_: *_${controlNet}_*
_Steps_: *_${steps}_*
_CFG_: *_${cfg}_*
_Sampler_: *_${sampler}_*
_Init Image_: *_${init_image}_*
\n` +
			"_Prompt_: ```" +
			prompt +
			"```";
		for (const [index, url] of images.entries()) {
			const _ = await conn.sendMessage(
				m.chat,
				{
					image: {
						url,
					},
					...(index === images.length - 1 ? { caption } : {}),
				},
				{ quoted: m }
			);
			if (tun) {
				await conn.sendMessage(
					m.chat,
					{
						image: {
							url: API(
								"rose",
								"/image/differentMe",
								{ url, style: "anime" },
								"apikey"
							),
						},
						caption: "_Using depth styling_",
					},
					{ quoted: _ }
				);
			}
		}
	} catch (e) {
		console.log(e);
		m.reply("Failed to create/styling");
	} finally {
		delete conn.animedif[m.sender];
	}
};
handler.help = ["animedif"];
handler.tags = ["ai"];
handler.command = ["animedif", "diffusion"];

export default handler;
