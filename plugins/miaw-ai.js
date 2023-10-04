let handler = async (m, { conn, args, usedPrefix, command, isOwner }) => {
	conn.openAIenter = conn.openAIenter ? conn.openAIenter : {};
	conn.openai = conn.openai ? conn.openai : {};

	if (!conn.openai_enable && !isOwner) {
		return m.reply("fitur dimatikan owner")
	}
	switch (args[0]) {
		case "on":
			if (conn.openAIenter[m.sender]) {
				return m.reply("Kamu masih berada di sesi openai");
			} else {
				conn.openAIenter[m.sender] = true;
				m.reply("Berhasil masuk ke sesi openai");
			}
			break;
		case "off":
			delete conn.openai[m.sender];
			conn.openAIenter[m.sender] = false;
			m.reply("Berhasil keluar dari sesi openai");
			break;
		case "offall":
			if (!isOwner) {
				return m.reply("Kamu bukan owner");
			} else {
				delete conn.openAIenter;
				delete conn.openai;
				conn.openai_enable = false;
				m.reply("Berhasil disable all chatgpt");
			}
			break;
		case "onall":
			if (!isOwner) {
				return m.reply("Kamu bukan owner");
			} else {
				conn.openai_enable = true;
				m.reply("Berhasil disable all chatgpt");
			}
			break;
		default:
			return m.reply(
				`Contoh Penggunaan:
${usedPrefix + command} on ~ Untuk Masuk Ke Sesi Openai
${usedPrefix + command} off ~ Untuk Keluar Dari Sesi Openai
${usedPrefix + command} offall ~ untuk disable all chatgpt *onlyOwner*
${usedPrefix + command} onall ~ untuk disable all chatgpt *onlyOwner*`
			);
	}
};

handler.help = ["chatgpt"];
handler.tags = ["premium"];
handler.command = /^(miaw)$/i;
handler.limit = true;
handler.premium = true;
export default handler;
