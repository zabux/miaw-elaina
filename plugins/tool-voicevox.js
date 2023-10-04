import axios from "axios";

const vox = async (m, { conn, text, usedPrefix, command }) => {
	if (!text) {
		return m.reply(`Example: *${usedPrefix + command}* good morning brother.`);
	}

	await conn.sendPresenceUpdate("recording", m.chat);
	const { data: _data } = await axios
		.request({
			baseURL: APIs["rose"],
			url: "/tools/translate",
			params: {
				text,
				source_lang: "auto",
				target_lang: "ja", // Japan
				apikey: APIKeys[APIs["rose"]],
			},
		})
		.catch((e) => e?.response);
	const { status: _status, result: _result } = _data;
	if (!_status) {
		return m.reply("Ops something wrong");
	}
	const _text = _result["translations"][0];
	const { data, status } = await axios
		.request({
			baseURL: APIs["rose"],
			url: "/voicevox/synthesis",
			method: "POST",
			params: {
				apikey: APIKeys[APIs["rose"]],
			},
			data: { speaker: 5, text: _text },
			responseType: "arraybuffer",
		})
		.catch((e) => e?.response);
	if (status !== 200) {
		return m.reply("Synthesis failed");
	}
	// find your way to send audio !muted
	await conn.sendFile(m.chat, data, "", "", m);
	/*
	await conn.sendMessage(m.chat, {
		audio: Buffer.from(data),
		ppt: true,
		//mimetype: "audio/wav"
	}, { quoted: m } )
	*/
};
vox["command"] = ["speak", "voicevox"];
export default vox;
