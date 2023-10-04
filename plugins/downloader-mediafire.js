import { mediafiredl } from "@bochilteam/scraper";
let handler = async (m, { conn, args, usedPrefix, command }) => {
	if (!args[0])
		return m.reply(
			`Masukan Url!\n\nContoh:\n${
				usedPrefix + command
			} https://www.mediafire.com/file/941xczxhn27qbby/GBWA_V12.25FF-By.SamMods-.apk/file`
		);
	if (!/https:\/\/www.mediafire.com\//i.test(args[0]))
		return m.reply("Invalid Url!");
	let res = await mediafiredl(args[0]);
	let { url, url2, filename, ext, aploud, filesize, filesizeH } = res;
	let caption = `
    [ MEDIAFIRE ]
*📮 Name File:* ${filename}
*📁 Size File:* ${filesizeH}
*🗂️ Extension:* ${ext}
*📨 Uploaded:* ${aploud}
`.trim();
	m.reply(caption);
	await conn.sendFile(m.chat, url, filename, "", m, null, {
		mimetype: ext,
		asDocument: true,
	});
};
handler.help = ["mediafire"].map((v) => v + " <url>");
handler.tags = ["downloader"];
handler.command = /^(mediafire|mf)$/i;
handler.limit = true;
export default handler;
