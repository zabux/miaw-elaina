import axios from "axios";
let handler = async (m, { conn, text, usedPrefix, command }) => {
	if (!text)
		return m.reply(
			`Masukan Nama Character!\n\nExample\n${usedPrefix + command} Hu Tao`
		);
	let nama = await axios.get(
		`https://genshin-db-api.vercel.app/api/characters?query=${text}&matchCategories=true&dumpResult=true&queryLanguages=English&resultLanguage=Indonesian`
	);
	let name = nama.data.match;
	if (nama.data.matchtype == "none")
		return m.reply(`Character ${text} Tidak Ditemukam`);
	if (name == "Amber") {
		conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Support/Character_Amber.jpg",
			`${name}.jpg`,
			`Here Build Support For ${name}`,
			m
		);
		await delay(2000);
		conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Main%20DPS/Character_Amber.jpg",
			`${name}.jpg`,
			`Here Another Build Main Dps For ${name}`,
			m
		);
	}
	if (name == "Barbara") {
		conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Healer/Character_Barbara.jpg",
			`${name}.jpg`,
			`Here Build For ${name}`,
			m
		);
	}
	if (name == "Beidou") {
		conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Sub%20DPS/Character_Beidou.jpg",
			`${name}.jpg`,
			`Here Build For ${name}`,
			m
		);
	}
	if (name == "Bennett") {
		conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Healer/Character_Bennett.jpg",
			`${name}.jpg`,
			`Here Build For ${name}`,
			m
		);
	}
	if (name == "Chongyun") {
		conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Burst%20DPS/Character_Chongyun.jpg",
			`${name}.jpg`,
			`Here Build For ${name}`,
			m
		);
	}
	if (name == "Diluc") {
		conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Main%20DPS/Character_Diluc.jpg",
			`${name}.jpg`,
			`Here Build For ${name}`,
			m
		);
	}
	if (name == "Fischl") {
		conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Sub%20DPS/Character_Fischl.jpg",
			`${name}.jpg`,
			`Here Build For ${name}`,
			m
		);
	}
	if (name == "Jean") {
		conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Healer/Character_Jean.jpg",
			`${name}.jpg`,
			`Here Build Healer For ${name}`,
			m
		);
		await delay(2000);
		conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Burst%20DPS/Character_Jean.jpg",
			`${name}.jpg`,
			`Here Another Burst Dps Build For ${name}`,
			m
		);
	}
	if (name == "Kaeya") {
		conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Sub%20DPS/Character_Kaeya.jpg",
			`${name}.jpg`,
			`Here Build Sub Dps For ${name}`,
			m
		);
		await delay(2000);
		conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Support/Character_Kaeya.jpg",
			`${name}.jpg`,
			`Here Another Support Build For ${name}`,
			m
		);
		await delay(2000);
		conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Main%20DPS/Character_Kaeya.jpg",
			`${name}.jpg`,
			`Here Another Build Main Dps For ${name}`,
			m
		);
	}
	if (name == "Keqing") {
		conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Main%20DPS/Character_Keqing_Electro.jpg",
			`${name}.jpg`,
			`Here Build Electro For ${name}`,
			m
		);
		await delay(2000);
		conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Main%20DPS/Character_Keqing_Physical.jpg",
			`${name}.jpg`,
			`Here Another Build Physical For ${name}`,
			m
		);
		await delay(2000);
		conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Aggravate/Character_Keqing_Quicken.jpg",
			`${name}.jpg`,
			`Here Another Build Quicken For ${name}`,
			m
		);
	}
	if (name == "Klee") {
		conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Main%20DPS/Character_Klee.jpg",
			`${name}.jpg`,
			`Here Build For ${name}`,
			m
		);
	}
	if (name == "Lisa") {
		conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Sub%20DPS/Character_Lisa.jpg",
			`${name}.jpg`,
			`Here Build Sub Dps For ${name}`,
			m
		);
		await delay(2000);
		conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Support/Character_Lisa.jpg",
			`${name}.jpg`,
			`Here Another Build Support For ${name}`,
			m
		);
		await delay(2000);
		conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Main%20DPS/Character_Lisa.jpg",
			`${name}.jpg`,
			`Here Another Build Main Dps For ${name}`,
			m
		);
	}
	if (name == "Mona") {
		conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Burst%20DPS/Character_Mona.jpg",
			`${name}.jpg`,
			`Here Build Burst Dps For ${name}`,
			m
		);
		await delay(2000);
		conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Support/Character_Mona_Nuke.jpg",
			`${name}.jpg`,
			`Here Another Build Mona Nuke For ${name}`,
			m
		);
		await delay(2000);
		conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Support/Character_Mona_Freeze.jpg",
			`${name}.jpg`,
			`Here Another Build Mona Freeze For ${name}`,
			m
		);
	}
	if (name == "Ningguang") {
		conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Main%20DPS/Character_Ningguang.jpg",
			`${name}.jpg`,
			`Here Build Main Dps For ${name}`,
			m
		);
		await delay(2000);
		conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Burst%20DPS/Character_Ningguang.jpg",
			`${name}.jpg`,
			`Here Another Build Burst Dps For ${name}`,
			m
		);
		await delay(2000);
		conn.sendFile(
			m.chat,
			"saya",
			`${name}.jpg`,
			`Here Another Build For ${name}`,
			m
		);
	}
	if (name == "Noelle") {
		conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Main%20DPS/Character_Noelle.jpg",
			`${name}.jpg`,
			`Here Build For ${name}`,
			m
		);
	}
	if (name == "Qiqi") {
		conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Healer/Character_Qiqi.jpg",
			`${name}.jpg`,
			`Here Build For ${name}`,
			m
		);
	}
	if (name == "Razor") {
		conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Main%20DPS/Character_Razor.jpg",
			`${name}.jpg`,
			`Here Build For ${name}`,
			m
		);
	}
	if (name == "Sucrose") {
		conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Support/Character_Sucrose.jpg",
			`${name}.jpg`,
			`Here Build For ${name}`,
			m
		);
	}
	if (name == "Traveler") {
		conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Burst%20DPS/Character_Traveler_Geo.jpg",
			`${name}.jpg`,
			`Here Build For ${name} Geo`,
			m
		);
		await delay(2000);
		conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Support/Character_Traveler_Anemo.jpg",
			`${name}.jpg`,
			`Here Build For ${name} Anemo`,
			m
		);
		await delay(2000);
		conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Support/Character_Traveler_Dendro.jpg",
			`${name}.jpg`,
			`Here Build For ${name} Dendro`,
			m
		);
		await delay(2000);
		conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Support/Character_Traveler_Electro.jpg",
			`${name}.jpg`,
			`Here Build For ${name} Electro`,
			m
		);
	}
	if (name == "Venti") {
		conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Support/Character_Venti.jpg",
			`${name}.jpg`,
			`Here Build Support For ${name}`,
			m
		);
		await delay(2000);
		conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Burst%20DPS/Character_Venti.jpg",
			`${name}.jpg`,
			`Here Another Build Burst Dps For ${name}`,
			m
		);
	}
	if (name == "Xiangling") {
		conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Support/Character_Xiangling.jpg",
			`${name}.jpg`,
			`Here Build Support For ${name}`,
			m
		);
		await delay(2000);
		conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Main%20DPS/Character_Xiangling.jpg",
			`${name}.jpg`,
			`Here Another Build  Main DpsFor ${name}`,
			m
		);
		await delay(2000);
		conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Burst%20DPS/Character_Xiangling.jpg",
			`${name}.jpg`,
			`Here Another Build Burst Dps For ${name}`,
			m
		);
	}
	if (name == "Xingqiu") {
		conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Burst%20DPS/Character_Xingqiu.jpg",
			`${name}.jpg`,
			`Here Build For ${name}`,
			m
		);
	}
	if (name == "Diona") {
		conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Healer/Character_Diona.jpg",
			`${name}.jpg`,
			`Here Build For ${name}`,
			m
		);
	}
	if (name == "Tartaglia") {
		conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Main%20DPS/Character_Tartaglia.jpg",
			`${name}.jpg`,
			`Here Build For ${name}`,
			m
		);
	}
	if (name == "Xinyan") {
		conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Main%20DPS/Character_Xinyan.jpg",
			`${name}.jpg`,
			`Here Build For ${name}`,
			m
		);
	}
	if (name == "Zhongli") {
		conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Support/Character_Zhongli.jpg",
			`${name}.jpg`,
			`Here Build Support For ${name}`,
			m
		);
		await delay(1500);
		conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Burst%20DPS/Character_Zhongli.jpg",
			`${name}.jpg`,
			`Here Another Build Burst Dps For ${name}`,
			m
		);
	}
	if (name == "Albedo") {
		conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Burst%20DPS/Character_Albedo.jpg",
			`${name}.jpg`,
			`Here Build For ${name}`,
			m
		);
	}
	if (name == "Ganyu") {
		conn.sendFile(
			m.chat,
			"https://telegra.ph/file/1a51adbe37e63a7afea6a.jpg",
			`${name}.jpg`,
			`Here Build Main Dps Melt For ${name}`,
			m
		);
		await delay(1500);
		conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Main%20DPS/Character_Ganyu_Freeze.jpg",
			`${name}.jpg`,
			`Here Another Build Main Dps For ${name}`,
			m
		);
	}
	if (name == "Hu Tao") {
		conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Main%20DPS/Character_HuTao.jpg",
			`${name}.jpg`,
			`Here Build For ${name}`,
			m
		);
	}
	if (name == "Xiao") {
		conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Main%20DPS/Character_Xiao.jpg",
			`${name}.jpg`,
			`Here Build For ${name}`,
			m
		);
	}
	if (name == "Rosaria") {
		conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Support/Character_Rosaria.jpg",
			`${name}.jpg`,
			`Here Build For ${name}`,
			m
		);
	}
	if (name == "Eula") {
		conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Main%20DPS/Character_Eula.jpg",
			`${name}.jpg`,
			`Here Build For ${name}`,
			m
		);
	}
	if (name == "Yanfei") {
		conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Main%20DPS/Character_Yanfei.jpg",
			`${name}.jpg`,
			`Here Build Main Dps For ${name}`,
			m
		);
		await delay(1500);
		conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Support/Character_Yanfei.jpg",
			`${name}.jpg`,
			`Here Another Build Support For ${name}`,
			m
		);
		await delay(1500);
		conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Sub%20DPS/Character_Yanfei.jpg",
			`${name}.jpg`,
			`Here Another Build Sub Dps For ${name}`,
			m
		);
	}
	if (name == "Kaedehara Kazuha") {
		conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Support/Character_Kazuha.jpg",
			`${name}.jpg`,
			`Here Build For ${name}`,
			m
		);
	}
	if (name == "Kamisato Ayaka") {
		conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Main%20DPS/Character_Ayaka.jpg",
			`${name}.jpg`,
			`Here Build For ${name}`,
			m
		);
	}
	if (name == "Sayu") {
		conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Healer/Character_Sayu.jpg",
			`${name}.jpg`,
			`Here Build For ${name}`,
			m
		);
	}
	if (name == "Yoimiya") {
		conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Main%20DPS/Character_Yoimiya.jpg",
			`${name}.jpg`,
			`Here Build For ${name}`,
			m
		);
	}
	if (name == "Aloy") {
		conn.sendFile(
			m.chat,
			"https://telegra.ph/file/33809d8ab39eff34c8ab3.jpg",
			`${name}.jpg`,
			`Here Build For ${name}`,
			m
		);
	}
	if (name == "Kujou Sara") {
		conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Support/Character_Sara.jpg",
			`${name}.jpg`,
			`Here Build For ${name}`,
			m
		);
	}
	if (name == "Raiden Shogun") {
		conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Burst%20DPS/Character_Raiden.jpg",
			`${name}.jpg`,
			`Here Build For ${name}`,
			m
		);
	}
	if (name == "Sangonomiya Kokomi") {
		conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Healer/Character_Kokomi.jpg",
			`${name}.jpg`,
			`Here Build For ${name}`,
			m
		);
	}
	if (name == "Thoma") {
		conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Support/Character_Thoma.jpg",
			`${name}.jpg`,
			`Here Build For ${name}`,
			m
		);
	}
	if (name == "Arataki Itto") {
		conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Main%20DPS/Character_Itto.jpg",
			`${name}.jpg`,
			`Here Build For ${name}`,
			m
		);
	}
	if (name == "Gorou") {
		conn.sendFile(
			m.chat,
			"https://github.com/FortOfFans/FortOfFans.github.io/blob/main/Characters/en-US/Support/Character_Gorou.jpg",
			`${name}.jpg`,
			`Here Build For ${name}`,
			m
		);
	}
	if (name == "Shenhe") {
		conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Support/Character_Shenhe.jpg",
			`${name}.jpg`,
			`Here Build For ${name}`,
			m
		);
	}
	if (name == "Yun Jin") {
		conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Support/Character_YunJin.jpg",
			`${name}.jpg`,
			`Here Build For ${name}`,
			m
		);
	}
	if (name == "Yae Miko") {
		conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Burst%20DPS/Character_Yae.jpg",
			`${name}.jpg`,
			`Here Build Burst Dps For ${name}`,
			m
		);
		await delay(1500);
		conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Aggravate/Character_Yae.jpg",
			`${name}.jpg`,
			`Here Build Aggravate For ${name}`,
			m
		);
	}
	if (name == "Kamisato Ayato") {
		conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Sub%20DPS/Character_Ayato.jpg",
			`${name}.jpg`,
			`Here Build Sub Dps For ${name}`,
			m
		);
	}
	if (name == "Yelan") {
		conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Sub%20DPS/Character_Yelan.jpg",
			`${name}.jpg`,
			`Here Build Sub Dps For ${name}`,
			m
		);
	}
	if (name == "Kuki Shinobu") {
		conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Healer/Character_Shinobu.jpg",
			`${name}.jpg`,
			`Here Build Healer For ${name}`,
			m
		);
		await delay(1500);
		conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Support/Character_Shinobu.jpg",
			`${name}.jpg`,
			`Here Build Support For ${name}`,
			m
		);
	}
	if (name == "Shikanoin Heizou") {
		conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Main%20DPS/Character_Heizou.jpg",
			`${name}.jpg`,
			`Here Build For ${name}`,
			m
		);
	}
	if (name == "Tighnari") {
		conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Driver/Character_Tighnari.jpg",
			`${name}.jpg`,
			`Here Build For ${name}`,
			m
		);
	}
	if (name == "Collei") {
		conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Support/Character_Collei.jpg",
			`${name}.jpg`,
			`Here Build For ${name}`,
			m
		);
	}
	if (name == "Dori") {
		conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Healer/Character_Dori.jpg",
			`${name}.jpg`,
			`Here Build For ${name}`,
			m
		);
	}
	if (name == "Nilou") {
		conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Main%20DPS/Character_Nilou.jpg",
			`${name}.jpg`,
			`Here Build For ${name}`,
			m
		);
	}
	if (name == "Cyno") {
		conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Main%20DPS/Character_Cyno.jpg",
			`${name}.jpg`,
			`Here Build For ${name}`,
			m
		);
	}
	if (name == "Candace") {
		conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Support/Character_Candace.jpg",
			`${name}.jpg`,
			`Here Build For ${name}`,
			m
		);
	}
	if (name == "Nahida") {
		conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Support/Character_Nahida.jpg",
			`${name}.jpg`,
			`Here Build For ${name}`,
			m
		);
	}
	if (name == "Layla") {
		conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Support/Character_Layla.jpg",
			`${name}.jpg`,
			`Here Build For ${name}`,
			m
		);
	}
	if (name == "Wanderer") {
		conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Main%20DPS/Character_Wanderer.jpg",
			`${name}.jpg`,
			`Here Build For ${name}`,
			m
		);
	}
	if (name == "Faruzan") {
		conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Support/Character_Faruzan.jpg",
			`${name}.jpg`,
			`Here Build For ${name}`,
			m
		);
	}
	if (name == "Alhaitham") {
		conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Main%20DPS/Character_Alhaitham.jpg",
			`${name}.jpg`,
			`Here Build For ${name}`,
			m
		);
	}
	if (name == "Yaoyao") {
		conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Healer/Character_Yaoyao.jpg",
			`${name}.jpg`,
			`Here Build For ${name}`,
			m
		);
	}
	if (name == "Dehya") {
		conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Main%20DPS/Character_Dehya.jpg",
			`${name}.jpg`,
			`Here Build For ${name}`,
			m
		);
	}
	if (name == "Mika") {
		conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Support/Character_Mika.jpg",
			`${name}.jpg`,
			`Here Build For ${name}`,
			m
		);
	}
	if (name == "Baizhu") {
		conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Healer/Character_Baizhu.jpg",
			`${name}.jpg`,
			`Here Build For ${name}`,
			m
		);
	}
	if (name == "Kaveh") {
		conn.sendFile(
			m.chat,
			"https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Driver/Character_Kaveh.jpg",
			`${name}.jpg`,
			`Here Build For ${name}`,
			m
		);
	}
};
handler.help = ["buildgi"];
handler.tags = ["genshin"];
handler.command = /^(buildgi)$/;
handler.onlyprem = true;
handler.limit = true;
export default handler;

const delay = (time) => new Promise((res) => setTimeout(res, time));
