import axios from "axios";
import cheerio from "cheerio";
let handler = async (m, { conn, args, usedPrefix, command }) => {
	if (!args[0])
		return m.reply(
			`Masukan Urls!\n\nContoh:\n${
				usedPrefix + command
			} https://www.instagram.com/p/Cq8o8QZupaE/?igshid=YmMyMTA2M2Y=`
		);
	if (!/https:\/\/www.instagram.com/i.test(args[0]))
		return m.reply("Invalid Urls!");
	m.reply(wait);
	let src = await igdl(args[0]);
	if (src.status) {
		for (let data of src.media) {
			await conn.sendFile(m.chat, data, null, "", m);
			await delay(1500);
		}
	} else {
		let url = await axios.get(
			API("lol", "/api/instagram2", { url: args[0] }, "apikey")
		);
		for (let data of url.data.result.media) {
			await conn.sendFile(m.chat, data, null, "", m);
			await delay(1500);
		}
	}
};
handler.help = ["instagram"].map((v) => v + " <url>");
handler.tags = ["downloader"];
handler.command = /^(ig|instagram|igmp4|igdownload|instagrammp4)$/i;
handler.limit = true;
export default handler;
const delay = (time) => new Promise((res) => setTimeout(res, time));

async function igdl(url) {
	try {
		let Get_Data = await axios.get(url);
		let Get_Result = Get_Data.data;
		let $ = cheerio.load(Get_Result);
		let data = JSON.parse($("script").html());
		let media = [];
		for (let x of [...data.image, ...data.video])
			media.push(x.url || x.contentUrl);
		return {
			status: true,
			caption: data.articleBody,
			media,
			Credits:
				"https://github.com/ohsyme/skrep/blob/main/src/scraper/downloader/instagram.js",
		};
	} catch (error) {
		return {
			status: false,
			message: error,
		};
	}
}
