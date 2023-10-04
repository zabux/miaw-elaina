import kampang from "../lib/ampangPedia.js";
const api = new kampang(
	"xzReQnGA",
	"C8YOAe9HsuPiOBZOFVttyXvQuuV8QxKWdKPXioNawPzO1v3qpAOf3ySXOV8pZom8"
);
/**
 * @p memek wkw
 */
const meki = async (m, { conn, text, command, args, usedPrefix }) => {
	if (command === "my-duit") {
		const { result: status, data } = await api.profile();
		return m.reply(
			(function (t) {
				t = "";
				for (const key in data) {
					t += `${key.replace("_", " ")}: ${data[key]}\n`;
				}
				return t;
			})()
		);
	}
	if (command === "my-order") {
		const [service, data_no] = text.split("|");
		if (!(service || data_no)) {
			return m.reply(`Example: ${usedPrefix + command} code|tujuan`);
		}
		const {
			result: status,
			data,
			message: _msg,
		} = await api.order({
			type: "order",
			service,
			data_no,
		});
		if (!status) {
			return m.reply(_msg);
		}
		const { trxid } = data;
		m.reply(
			`_${_msg}_\n\nDetail:\n > Order: ${data["service"]}\n > Tujuan : ${data["data"]}\n > Status : ${data["status"]}\n\n_${data["note"]}_`
		);

		// using then
		api
			.watcher({
				trxid,
			})
			.then((_data) => {
				console.log(_data);
				if (!_data["result"]) {
					return m.reply(_data["message"]);
				}
				m.reply(
					`_Status orderan *${
						_data["data"]["status"]
					}*_\n\nDetail:\n > Order: ${data["service"]}\n > Tujuan : ${
						_data["data"]["data"]
					}\n > Status : ${_data["data"]["status"]}\n\n_${
						_data["data"]["status"] !== "success"
							? _data["data"]["note"]
							: ` > RefId : ${_data["data"]["note"]}\n\nTerima kasih telah order ^_^`
					}_`
				);
			});
	}
	if (command === "my-produk") {
		const { result, data, message } = await api.services(args[0] || false);
		if (!result || !(Array.isArray(data) && data.length)) {
			return m.reply(message);
		}
		const filter = (function () {
			const type = {};
			const brand = {};
			for (const obj of data) {
				if (type[obj["type"]] && Array.isArray(type[obj["type"]])) {
					type[obj["type"]].push({ ...obj });
				} else {
					type[obj["type"]] = type[obj["type"]] ? type[obj["type"]] : [];
				}
			}
			return type;
		})();
		if (!args[0] || !args[1]) {
			return m.reply(
				`Berikut list brand yang tersedia\n${(function (t = "") {
					const _services = [];
					for (const key in filter) {
						t += `Layanan *${key}*\n`;
						for (const obj of filter[key]) {
							if (!_services.includes(obj["brand"])) {
								_services.push(obj["brand"]);
								t += `> ${obj["brand"]}\n`;
							}
						}
						t += "\n------\n";
					}
					return t;
				})()}Example: *${usedPrefix + command}* [layanan] [brand]`
			);
		}
		if (!filter[args[0].toLowerCase()]) {
			return m.reply("Yah layanan/brand yang kamu colokin gakk ada :(");
		}
		m.reply(
			(function (t = "") {
				for (const key in filter) {
					if (args[0]?.toLowerCase() === key) {
						t += `*Produk*: ${key} ${
							args[1] ? args[1]?.toUpperCase() : ""
						}\n\n`;
						for (const subkey of filter[key].sort(
							(a, b) => b.price - a.price
						)) {
							if (
								args[1]?.toLowerCase() ===
								subkey["brand"].split(" ")[0].toLowerCase()
							) {
								t += `> brand: ${subkey["brand"]}\n > name : ${subkey["name"]}\n > code : ${subkey["code"]}\n > price : ${subkey["price"]}\n > status : ${subkey["status"]}\n${subkey["note"]}\n*-------*\n`;
							}
						}
					}
				}
				return t;
			})()
		);
	}
};
meki["command"] = ["my-duit", "my-order", "my-produk"];
meki["owner"] = true;
export default meki;
