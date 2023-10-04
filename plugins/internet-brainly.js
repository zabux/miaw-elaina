import { Brainly } from "brainly-scraper-v2";
let handler = async (m, { text, command, usedPrefix }) => {
	if (!text)
		return m.reply(
			`Masukan Soal!\n\nContoh:\n${
				usedPrefix + command
			} Manusia Terbuat Dari Apa?`
		);
	await Brainly.initialize();
	const brain = new Brainly("id");
	brain.search(text, "id").then((v) => {
		let data = v
			.map((x) => {
				return `
*Question:* 
${x.question.content.replace(
	/<p>|<strong>|<li>|<h3>|<ol>|<\/p>|<\/strong>|<\/li>|<\/h3>|<\/ol>|<br \/>/gi,
	""
)}

*Answer:* 
${x.answers[0].content.replace(
	/<p>|<h2>|<\/h2>|<strong>|<li>|<h3>|<ol>|<\/p>|<\/strong>|<\/li>|<\/h3>|<\/ol>|<br \/>|Jawaban:|Answer:|Jawaban|Answer|Soal/gi,
	""
)}
`.trim();
			})
			.join("\n\n\n");
		m.reply(data);
	});
};
handler.help = ["brainly <pertanyaan>"];
handler.tags = ["internet"];
handler.command = /^brainly$/i;
export default handler;
