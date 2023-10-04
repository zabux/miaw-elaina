let handler = async (m, { conn, text, usedPrefix, command }) => {
	if (!text)
		return m.reply(
			`Masukan Nama Character!\n\nExample\n${usedPrefix + command} Bronya`
		);
	let name = text.toLowerCase();
	if (/trailblazer|trail|blazer/i.test(name)) {
		conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/HSR/main/sheets/Fire%20Trailblazer.jpg",
			name + ".jpg",
			"Ini Dia Kak",
			m
		);
	}
	if (/bailu/i.test(name))
		return conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/HSR/main/sheets/Bailu.jpg",
			name + ".jpg",
			"Ini Dia Kak",
			m
		);
	if (/bronya/i.test(name))
		return conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/HSR/main/sheets/Bronya.jpg",
			name + ".jpg",
			"Ini Dia Kak",
			m
		);
	if (/blade/i.test(name)) return m.reply("Coming Soon...");
	if (/clara/i.test(name))
		return conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/HSR/main/sheets/Clara.jpg",
			name + ".jpg",
			"Ini Dia Kak",
			m
		);
	if (/fu xuan|xuan|fu/i.test(name)) return m.reply("Coming Soon...");
	if (/gepard/i.test(name))
		return conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/HSR/main/sheets/Gepard.jpg",
			name + ".jpg",
			"Ini Dia Kak",
			m
		);
	if (/himeko/i.test(name))
		return conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/HSR/main/sheets/Himeko.jpg",
			name + ".jpg",
			"Ini Dia Kak",
			m
		);
	if (/jing yuan|jing|yuan/i.test(name))
		return conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/HSR/main/sheets/Jing%20Yuan.jpg",
			name + ".jpg",
			"Ini Dia Kak",
			m
		);
	if (/kafka/i.test(name))
		return conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/HSR/main/sheets/Kafka.jpg",
			name + ".jpg",
			"Ini Dia Kak",
			m
		);
	if (/luocha/i.test(name)) return m.reply("Coming Soon...");
	if (/seele/i.test(name))
		return conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/HSR/main/sheets/Seele.jpg",
			name + ".jpg",
			"Ini Dia Kak",
			m
		);
	if (/silver wolf|silver|wolf/i.test(name))
		return conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/HSR/main/sheets/Silver%20Wolf.jpg",
			name + ".jpg",
			"Ini Dia Kak",
			m
		);
	if (/welt/i.test(name))
		return conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/HSR/main/sheets/Welt.jpg",
			name + ".jpg",
			"Ini Dia Kak",
			m
		);
	if (/yanqing|yanq|qing/i.test(name))
		return conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/HSR/main/sheets/Yanqing.jpg",
			name + ".jpg",
			"Ini Dia Kak",
			m
		);
	if (/arlan/i.test(name))
		return conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/HSR/main/sheets/Arlan.jpg",
			name + ".jpg",
			"Ini Dia Kak",
			m
		);
	if (/asta/i.test(name))
		return conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/HSR/main/sheets/Asta.jpg",
			name + ".jpg",
			"Ini Dia Kak",
			m
		);
	if (/dan hen(g|k)|dan|hen(g|k)/i.test(name))
		return conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/HSR/main/sheets/Dan%20Heng.jpg",
			name + ".jpg",
			"Ini Dia Kak",
			m
		);
	if (/herta/i.test(name))
		return conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/HSR/main/sheets/Herta.jpg",
			name + ".jpg",
			"Ini Dia Kak",
			m
		);
	if (/hook/i.test(name))
		return conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/HSR/main/sheets/Hook.jpg",
			name + ".jpg",
			"Ini Dia Kak",
			m
		);
	if (/march 7th|march|7th/i.test(name))
		return conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/HSR/main/sheets/March%207th.jpg",
			name + ".jpg",
			"Ini Dia Kak",
			m
		);
	if (/natasha/i.test(name))
		return conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/HSR/main/sheets/Natasha.jpg",
			name + ".jpg",
			"Ini Dia Kak",
			m
		);
	if (/pela/i.test(name))
		return conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/HSR/main/sheets/Pela.jpg",
			name + ".jpg",
			"Ini Dia Kak",
			m
		);
	if (/qingque/i.test(name))
		return conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/HSR/main/sheets/Qingque.jpg",
			name + ".jpg",
			"Ini Dia Kak",
			m
		);
	if (/sampo/i.test(name))
		return conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/HSR/main/sheets/Sampo.jpg",
			name + ".jpg",
			"Ini Dia Kak",
			m
		);
	if (/serval/i.test(name))
		return conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/HSR/main/sheets/Serval.jpg",
			name + ".jpg",
			"Ini Dia Kak",
			m
		);
	if (/sushang/i.test(name))
		return conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/HSR/main/sheets/Sushang.jpg",
			name + ".jpg",
			"Ini Dia Kak",
			m
		);
	if (/tingyun/i.test(name))
		return conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/HSR/main/sheets/Tingyun.jpg",
			name + ".jpg",
			"Ini Dia Kak",
			m
		);
};
handler.help = ["buildhsr"];
handler.tags = ["tools"];
handler.command = /^(buildhsr)$/;
handler.onlyprem = true;
handler.limit = true;
export default handler;
