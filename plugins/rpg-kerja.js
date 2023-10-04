let handler = async (m, { conn, command, args, usedPrefix }) => {
	let type = (args[0] || "").toLowerCase();
	let users = global.db.data.users[m.sender];
	let time = users.lastkerja + 300000;
	let __timers = new Date() - users.lastkerja;
	let _timers = 0 - __timers;
	let timers = clockString(_timers);
	let penumpan = [
		"mas mas",
		"bapak bapak",
		"cewe sma",
		"bocil epep",
		"emak emak",
	];
	let penumpang = penumpan[Math.floor(Math.random() * penumpan.length)];
	let daganga = [
		"wortel",
		"sawi",
		"selada",
		"tomat",
		"seledri",
		"cabai",
		"daging",
		"ikan",
		"ayam",
	];
	let dagangan = daganga[Math.floor(Math.random() * daganga.length)];
	let pasie = ["sakit kepala", "cedera", "luka bakar", "patah tulang"];
	let pasien = pasie[Math.floor(Math.random() * pasie.length)];
	let pane = [
		"Wortel",
		"Kubis",
		"stowbery",
		"teh",
		"padi",
		"jeruk",
		"pisang",
		"semangka",
		"durian",
		"rambutan",
	];
	let panen = pane[Math.floor(Math.random() * pane.length)];
	let bengke = [
		"mobil",
		"motor",
		"becak",
		"bajai",
		"bus",
		"angkot",
		"becak",
		"sepeda",
	];
	let bengkel = bengke[Math.floor(Math.random() * bengke.length)];
	let ruma = [
		"Membangun Rumah",
		"Membangun Gedung",
		"Memperbaiki Rumah",
		"Memperbaiki Gedung",
		"Membangun Fasilitas Umum",
		"Memperbaiki Fasilitas Umum",
	];
	let rumah = ruma[Math.floor(Math.random() * ruma.length)];

	const sections = [
		{
			title: "🌟 List Kerjaan",
			rows: [
				{ title: "🛵 Ojek", rowId: usedPrefix + command + " ojek" },
				{ title: "🥗 Pedagang", rowId: usedPrefix + command + " pedagang" },
				{ title: "🏥 ️Dokter", rowId: usedPrefix + command + " dokter" },
				{ title: "🌾 Petani", rowId: usedPrefix + command + " petani" },
				{ title: "🏯 Montir", rowId: usedPrefix + command + " montir" },
				{ title: "⚒️ Kuli", rowId: usedPrefix + command + " kuli" },
			],
		},
	];

	const listMessage = {
		text: `*⎔───「 𝙺𝙴𝚁𝙹𝙰 」───⎔*`,
		footer: `⚡ Silakan pilih kerjaan di bawah...`,
		title: "",
		buttonText: `☂️ Klik Disini ☂️`,
		sections,
	};
	//PEMBATAS\\
	if (/kerjadulu|kerja|work/i.test(command)) {
		switch (type) {
			case "ojek":
				if (new Date() - users.lastkerja < 300000)
					throw `Kamu sudah bekerja\nSaatnya istirahat selama ${clockString(
						time - new Date()
					)}`;
				let hasilojek = Math.floor(Math.random() * 150000);
				m.reply(
					`Kamu Sudah Mengantarkan *${penumpang}* 🚗\nDan mendapatkan uang senilai *Rp ${hasilojek} ${rpg.emoticon(
						"money"
					)}*`
				).then(() => {
					users.money += hasilojek;
					users.lastkerja = new Date() * 1;
				});
				break;
			case "pedagang":
				if (new Date() - users.lastkerja < 300000)
					throw `Kamu sudah bekerja,Saatnya istirahat selama\n🕜 ${clockString(
						time - new Date()
					)}`;
				let hasildagang = Math.floor(Math.random() * 150000);
				m.reply(
					`Ada pembeli yg membeli *${dagangan}* 🛒\nDan mendapatkan uang senilai *Rp ${hasildagang} ${rpg.emoticon(
						"money"
					)}*`
				).then(() => {
					users.money += hasildagang;
					users.lastkerja = new Date() * 1;
				});
				break;
			case "dokter":
				if (new Date() - users.lastkerja < 300000)
					throw `Kamu sudah bekerja,Saatnya istirahat selama\n🕜 ${clockString(
						time - new Date()
					)}`;
				let hasildokter = Math.floor(Math.random() * 150000);
				m.reply(
					`Kamu menyembuhkan pasien *${pasien}* 💉\nDan mendapatkan uang senilai *Rp ${hasildokter}* ${rpg.emoticon(
						"money"
					)}`
				).then(() => {
					users.money += hasildokter;
					users.lastkerja = new Date() * 1;
				});
				break;
			case "petani":
				if (new Date() - users.lastkerja < 300000)
					throw `Kamu sudah bekerja,Saatnya istirahat selama\n🕜 ${clockString(
						time - new Date()
					)}`;
				let hasiltani = Math.floor(Math.random() * 150000);
				m.reply(
					`${panen} Sudah Panen !🌽 Dan menjualnya 🧺\nDan mendapatkan uang senilai Rp *${hasiltani} ${rpg.emoticon(
						"money"
					)}*`
				).then(() => {
					users.money += hasiltani;
					users.lastkerja = new Date() * 1;
				});
				break;
			case "montir":
				if (new Date() - users.lastkerja < 300000)
					throw `Kamu sudah bekerja,Saatnya istirahat selama\n🕜 ${clockString(
						time - new Date()
					)}`;
				let hasilmontir = Math.floor(Math.random() * 150000);
				m.reply(
					`Kamu Baru saja mendapatkan pelanggan dan memperbaiki *${bengkel} 🔧*\nDan kamu mendapatkan uang senilai *Rp ${hasilmontir}* ${rpg.emoticon(
						"money"
					)}`
				).then(() => {
					users.money += hasilmontir;
					users.lastkerja = new Date() * 1;
				});
				break;
			case "kuli":
				if (new Date() - users.lastkerja < 300000)
					throw `Kamu sudah bekerja,Saatnya istirahat selama\n🕜 ${clockString(
						time - new Date()
					)}`;
				let hasilkuli = Math.floor(Math.random() * 150000);
				m.reply(
					`Kamu baru saja selesai ${rumah} 🔨\nDan mendapatkan uang senilai *Rp ${hasilkuli} ${rpg.emoticon(
						"money"
					)}*`
				).then(() => {
					users.money += hasilkuli;
					users.lastkerja = new Date() * 1;
				});
				break;
			default:
				return m.reply(
					`*乂 Silahkan Pilih Pekerjaanmu*\n\n➠ Kuli \n➠ Montir \n➠ Petani \n➠ Dokter \n➠ Pedagang \n➠ Ojek \n\nExample\n${usedPrefix}kerja Kuli`
				);
			//return conn.sendMessage(m.chat, listMessage, {quoted: null})
		}
	}
};
handler.help = ["kerja"];
handler.tags = ["rpg"];
handler.command = /^kerja$/i;
handler.register = true;
handler.group = true;
handler.rpg = true;
export default handler;
function pickRandom(list) {
	return list[Math.floor(Math.random() * list.length)];
}
function clockString(ms) {
	let h = Math.floor(ms / 3600000);
	let m = Math.floor(ms / 60000) % 60;
	let s = Math.floor(ms / 1000) % 60;
	console.log({ ms, h, m, s });
	return [h, m, s].map((v) => v.toString().padStart(2, 0)).join(":");
}
