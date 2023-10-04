import axios from "axios";
async function sKata() {
	return new Promise((resolve, reject) => {
		axios
			.get(
				"https://raw.githubusercontent.com/clicknetcafe/azamibot-md-multi/0dae9f65cb7d35699a5f6a4f6c8f4326d24fd113/src/kbbi.json"
			)
			.then((kbbi) => {
				function random(list) {
					return list[Math.floor(Math.random() * list.length)];
				}
				let huruf = random([
					"a",
					"b",
					"c",
					"d",
					"e",
					"g",
					"h",
					"i",
					"j",
					"k",
					"l",
					"m",
					"n",
					"p",
					"r",
					"s",
					"t",
					"u",
					"w",
				]);
				let res = kbbi.data.filter((v) => v.startsWith(huruf));
				resolve({
					status: true,
					kata: random(res),
				});
			});
	});
}

async function cKata(input) {
	return new Promise((resolve, reject) => {
		axios
			.get(
				"https://raw.githubusercontent.com/clicknetcafe/azamibot-md-multi/0dae9f65cb7d35699a5f6a4f6c8f4326d24fd113/src/kbbi.json"
			)
			.then((kbbi) => {
				if (!kbbi.data.find((v) => v == input.toLowerCase()))
					return resolve({
						creator: "@neoxrs – Wildan Izzudin",
						status: false,
					});
				resolve({
					creator: "@neoxrs – Wildan Izzudin",
					status: true,
				});
			});
	});
}
export { sKata, cKata };
