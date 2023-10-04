import axios from "axios";
let handler = (m) => m;

handler.before = async (m, text) => {
	let chat = global.db.data.chats[m.chat];
	if (chat.simi && !chat.isBanned) {
		if (/^.*false|disnable|(turn)?off|0/i.test(m.text)) return;
		if (!m.text) return;
		try {
			let simi = await getMessage(m.text, "id");
			m.reply(simi);
		} catch (e) {
			throw "Maaf aku tidak mengerti";
		}
		return !0;
	}
	return true;
};
export default handler;

async function getMessage(yourMessage, langCode) {
	const res = await axios.post(
		"https://api.simsimi.vn/v2/simtalk",
		new URLSearchParams({
			text: yourMessage,
			lc: "id",
		})
	);

	if (res.status > 200) throw new Error(res.data.success);

	return res.data.message;
}
