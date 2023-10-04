import fetch from "node-fetch";
import { toAudio } from "../lib/converter.js";

import * as fs from "fs";

let handler = async (m, { conn, args, usedPrefix, command }) => {
	conn.youtubemp3 = conn.youtubemp3 ? conn.youtubemp3 : {};
	if (m.sender in conn.youtubemp3) return; m.reply(`*Sedang mengirim audio sebelumnya!*`);
	if (!args || !args[0])
		throw (
			"contoh: *" +
			usedPrefix +
			command +
			"* https://www.youtube.com/watch?v=K9_VFxzCuQ0"
		);
	else conn.youtubemp3[m.sender] = true;

	try {
		let data = await fetch(
			`https://api.azz.biz.id/api/play?q=${text}&key=global
		`);
		let json = await data.json();
		if (!json.status) {
			return m.reply("Can't download that audio");
		}
		m.reply("Sending audio");
		const _a = await fetch(json.mp3);
		const _b = await _a.buffer();
		const audio = await toAudio(_b, "mp4");
		conn.sendFile(m.chat, audio.data, "audio.mp3", "", m, null, {
			mimetype: "audio/mp4",
		});
	} catch (e) {
		m.reply("Failed sending audio\n\n" + e);
	} finally {
		delete conn.youtubemp3[m.sender];
	}
};
handler.help = ["mp3", "a", ""].map(
	(v) => "yt" + v + ` <url> <without message>`
);
handler.tags = ["downloader"];
handler.command = ["yta", "ytmp3", "ytaudio"];
export default handler;