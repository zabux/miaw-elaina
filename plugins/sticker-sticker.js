import fetch from "node-fetch";
import { addExif } from "../lib/sticker.js";
import { Sticker } from "wa-sticker-formatter";

let handler = async (m, { conn, args, usedPrefix, command }) => {
	let stiker = false;
	try {
		let [packname, ...author] = args.join` `.split`|`;
		author = (author || []).join`|`;
		let q = m.quoted ? m.quoted : m;
		let mime = (q.msg || q).mimetype || q.mediaType || "";
		if (/webp/g.test(mime)) {
			let img = await q.download?.();
			//m.reply(wait)
			stiker = await addExif(img, stickpack || "", stickauth || "");
		} else if (/image/g.test(mime)) {
			let img = await q.download?.();
			//m.reply(wait)
			stiker = await createSticker(img, false, stickpack, stickauth);
		} else if (/video/g.test(mime)) {
			if ((q.msg || q).seconds > 10) throw "Max 10 seconds!";
			let img = await q.download?.();
			//m.reply(wait)
			stiker = await mp4ToWebp(img, { pack: stickpack, author: stickauth });
		} else if (args[0] && isUrl(args[0])) {
			//m.reply(wait)
			stiker = await createSticker(false, args[0], "", author, 20);
		} else
			throw `Reply an image/video/sticker with command ${usedPrefix + command}`;
	} catch (e) {
		console.log(e);
		stiker = e;
	} finally {
		m.reply(stiker);
	}
};
handler.help = ["stiker", "s"];
handler.tags = ["sticker"];
handler.alias = ["stiker", "sticker", "sgif", "stikergif", "stickergif"];
handler.command = /^s(tic?ker)?(gif)?$/i;

export default handler;

const isUrl = (text) =>
	text.match(
		new RegExp(
			/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png)/,
			"gi"
		)
	);

async function createSticker(img, url, packName, authorName, quality) {
	let stickerMetadata = {
		type: "full",
		pack: stickpack,
		author: stickauth,
		quality,
	};
	return new Sticker(img ? img : url, stickerMetadata).toBuffer();
}

async function mp4ToWebp(file, stickerMetadata) {
	if (stickerMetadata) {
		if (!stickerMetadata.pack) stickerMetadata.pack = stickpack;
		if (!stickerMetadata.author) stickerMetadata.author = stickauth;
		if (!stickerMetadata.crop) stickerMetadata.crop = false;
	} else if (!stickerMetadata) {
		stickerMetadata = { pack: stickpack, author: stickauth, crop: false };
	}
	let getBase64 = file.toString("base64");
	const Format = {
		file: `data:video/mp4;base64,${getBase64}`,
		processOptions: {
			crop: stickerMetadata?.crop,
			startTime: "00:00:00.0",
			endTime: "00:00:7.0",
			loop: 0,
		},
		stickerMetadata: {
			...stickerMetadata,
		},
		sessionInfo: {
			WA_VERSION: "2.2106.5",
			PAGE_UA:
				"WhatsApp/2.2037.6 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36",
			WA_AUTOMATE_VERSION: "3.6.10 UPDATE AVAILABLE: 3.6.11",
			BROWSER_VERSION: "HeadlessChrome/88.0.4324.190",
			OS: "Windows Server 2016",
			START_TS: 1614310326309,
			NUM: "6247",
			LAUNCH_TIME_MS: 7934,
			PHONE_VERSION: "2.20.205.16",
		},
		config: {
			sessionId: "session",
			headless: true,
			qrTimeout: 20,
			authTimeout: 0,
			cacheEnabled: false,
			useChrome: true,
			killProcessOnBrowserClose: true,
			throwErrorOnTosBlock: false,
			chromiumArgs: [
				"--no-sandbox",
				"--disable-setuid-sandbox",
				"--aggressive-cache-discard",
				"--disable-cache",
				"--disable-application-cache",
				"--disable-offline-load-stale-cache",
				"--disk-cache-size=0",
			],
			executablePath:
				"C:\\\\Program Files (x86)\\\\Google\\\\Chrome\\\\Application\\\\chrome.exe",
			skipBrokenMethodsCheck: true,
			stickerServerEndpoint: true,
		},
	};
	let res = await fetch(
		"https://sticker-api.openwa.dev/convertMp4BufferToWebpDataUrl",
		{
			method: "post",
			headers: {
				Accept: "application/json, text/plain, /",
				"Content-Type": "application/json;charset=utf-8",
			},
			body: JSON.stringify(Format),
		}
	);
	return Buffer.from((await res.text()).split(";base64,")[1], "base64");
}