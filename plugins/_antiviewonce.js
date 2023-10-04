let handler = (m) => m;

handler.before = async function (m) {
	let chat = db.data.chats[m.chat];
	if (/^[.~#/\$,](read)?viewonce/.test(m.text)) return;
	if (!chat.viewonce) return;
	if (m.mtype == "viewOnceMessageV2") {
		let val = { ...m };
		let msg =
			val.message?.viewOnceMessage?.message ||
			val.message?.viewOnceMessageV2?.message;
		delete msg[Object.keys(msg)[0]].viewOnce;
		val.message = msg;
		await this.sendMessage(m.chat, { forward: val }, { quoted: m });
	}
};

export default handler;
