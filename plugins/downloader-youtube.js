let limit = 80;
import fetch from "node-fetch";
import { youtubedl, youtubedlv2, youtubedlv3 } from "@bochilteam/scraper";
let handler = async (
	m,
	{ conn, args, isPrems, isOwner, command, usedPrefix }
) => {
	if (!args || !args[0])
		throw `*Format Salah!*\n*Contoh:*\n• ${
			usedPrefix + command
		} https://youtu.be/yEvVyuNd9ZE`;
	let chat = global.db.data.chats[m.chat];
	const isY = /y(es)/gi.test(args[1]);
	const {
		thumbnail,
		audio: _audio,
		video: _video,
		title,
	} = await youtubedl(args[0])
		.catch(async (_) => await youtubedlv2(args[0]))
		.catch(async (_) => await youtubedlv3(args[0]));
	const limitedSize = (isPrems || isOwner ? 99 : limit) * 1024;
	if (/yt(audio|mp3|a|sound)|youtube(audio|mp3|sound)/i.test(command)) {
		let audio, source, res, link, lastError, isLimit;
		for (let i in _audio) {
			try {
				audio = _audio[i];
				isLimit = limitedSize < audio.fileSize;
				if (isLimit) continue;
				link = await audio.download();
				if (link) res = await fetch(link);
				isLimit =
					res?.headers.get("content-length") &&
					parseInt(res.headers.get("content-length")) < limitedSize;
				if (isLimit) continue;
				if (res) source = await res.arrayBuffer();
				if (source instanceof ArrayBuffer) break;
			} catch (e) {
				audio = link = source = null;
				lastError = e;
			}
		}
		if ((!(source instanceof ArrayBuffer) || !link || !res.ok) && !isLimit)
			throw "Error: " + (lastError || "Can't download audio");
		if (!isY && !isLimit)
			await conn.adReply(
				m.chat,
				`
*${decor.htki} YOUTUBE ${decor.htka}*

*❃ Title:* ${title}
*❃ Type:* mp3
*❃ Filesize:* ${audio.fileSizeH}

*L O A D I N G. . .*
`.trim(),
				title,
				null,
				thumbnail,
				args[0],
				m
			);
		if (!isLimit)
			await conn.sendFile(m.chat, source, title + ".mp3", "", m, null, {
				mimetype: "audio/mp4",
			});
	} else if (/yt(mp4|v|video|vid)|youtube(vid|video|mp4)/i.test(command)) {
		let video, source, res, link, lastError, isLimit;
		for (let i in _video) {
			try {
				video = _video[i];
				isLimit = limitedSize < video.fileSize;
				if (isLimit) continue;
				link = await video.download();
				if (link) res = await fetch(link);
				isLimit =
					res?.headers.get("content-length") &&
					parseInt(res.headers.get("content-length")) < limitedSize;
				if (isLimit) continue;
				if (res) source = await res.arrayBuffer();
				if (source instanceof ArrayBuffer) break;
			} catch (e) {
				video = source = link = null;
				lastError = e;
			}
		}
		if ((!(source instanceof ArrayBuffer) || !link || !res.ok) && !isLimit)
			throw "Error: " + (lastError || "Can't download video");
		if (!isY && !isLimit)
			await conn.adReply(
				m.chat,
				`
*${decor.htki} YOUTUBE ${decor.htka}*

*❃ Title:* ${title}
*❃ Quality:* 360p
*❃ Filesize:* ${video.fileSizeH}
`.trim(),
				title,
				null,
				thumbnail,
				args[0],
				m
			);
		if (!isLimit)
			await conn.sendMessage(
				m.chat,
				{
					video: { url: link },
					fileName: title + ".mp4",
					mimetype: "video/mp4",
					caption: title,
				},
				{ quoted: m }
			);
	}
};
handler.help = ["ytmp3", "ytmp4"].map((v) => v + " <url>");
handler.tags = ["downloader"];
handler.command =
	/^yt(mp3|mp4|v|a|audio|video|sound|vid)|youtube(mp3|mp4|audio|video|sound|vid)$/i;
handler.limit = true;
export default handler;
