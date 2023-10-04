import axios from "axios";

let handler = async (m, { conn, command, args, usedPrefix }) => {
	if (!args[0])
		throw `Example:\n*${usedPrefix}${command}* https://vt.tiktok.com/ZGJBtcsDq/`;
	if (!/https?:\/\/(www\.|v(t|m)\.|t\.)?tiktok\.com/i.test(args[0]))
		throw `Invalid url!`;
	m.reply("Progress...");
	const { data } = await axios
		.request({
			baseURL: APIs["rose"],
			url: "/downloader/tiktok",
			params: {
				url: args[0],
				apikey: APIKeys[APIs["rose"]],
			},
		})
		.catch((e) => e?.response);
	const { status, download, desc, author, message } = data;
	if (!status) {
		return m.reply(message);
	}
	await conn.sendMessage(
		m.chat,
		{
			video: {
				url: download["nowm"],
			},
			caption: `*Author*: ${author["nickname"]}\n\n${desc}`,
		},
		{ quoted: m }
	);
};
handler.help = ["tiktok", "tiktokaudio"].map((v) => v + " <url>");
handler.tags = ["downloader"];
handler.command = /^tiktok(audio|mp3|video|mp4)?|tt(audio|mp3|video|mp4)?$/i;
handler.limit = true;
export default handler;

async function tiktok(URL) {
	return new Promise((resolve, rejecet) => {
		axios
			.get("https://musicaldown.com/id", {
				headers: {
					"user-agent":
						"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36",
				},
			})
			.then((res) => {
				const $ = cheerio.load(res.data);
				const url_name = $("#link_url").attr("name");
				const token_name = $("#submit-form > div")
					.find("div:nth-child(1) > input[type=hidden]:nth-child(2)")
					.attr("name");
				const token_ = $("#submit-form > div")
					.find("div:nth-child(1) > input[type=hidden]:nth-child(2)")
					.attr("value");
				const verify = $("#submit-form > div")
					.find("div:nth-child(1) > input[type=hidden]:nth-child(3)")
					.attr("value");
				let data = {
					[`${url_name}`]: URL,
					[`${token_name}`]: token_,
					verify: verify,
				};
				axios
					.request({
						url: "https://musicaldown.com/id/download",
						method: "post",
						data: new URLSearchParams(Object.entries(data)),
						headers: {
							"user-agent":
								"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36",
							cookie: res.headers["set-cookie"],
						},
					})
					.then((respon) => {
						const ch = cheerio.load(respon.data);
						axios
							.request({
								url: "https://musicaldown.com/id/mp3",
								method: "post",
								headers: {
									"user-agent":
										"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36",
									cookie: res.headers["set-cookie"],
								},
							})
							.then((resaudio) => {
								const hc = cheerio.load(resaudio.data);
								const result = {
									pp: ch(
										"body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l4.center-align > div > div > img"
									).attr("src"),
									username: ch(
										"body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l4.center-align > div > h2:nth-child(2)"
									).text(),
									description: ch(
										"body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l4.center-align > div > h2:nth-child(3)"
									).text(),
									video: ch(
										"body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l8 > a:nth-child(5)"
									).attr("href"),
									audio: hc(
										"body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l8 > a:nth-child(6)"
									).attr("href"),
									video_original: ch(
										"body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l8 > a:nth-child(9)"
									).attr("href"),
								};
								resolve(result);
							});
					});
			});
	});
}
