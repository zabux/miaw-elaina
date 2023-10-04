import Crypto from "crypto";
import axios from "axios";

class AmpangPedia {
	#userid = null;
	#apikey = null;
	constructor(userid, apikey) {
		this.#userid = userid;
		this.#apikey = apikey;
		this.userAgent = "FrierenDv (NodeJS 18x)";
		this.schema = "https";
		this.baseURL = this.schema + "://" + "ampangpedia.com";
	}
	/**
	 * Create secret request :/
	 */
	async #createRequest(opts) {
		return await axios
			.request({
				baseURL: this.baseURL,
				...opts,
			})
			.catch((e) => (e === null || e === void 0 ? void 0 : e.response));
	}
	#signature() {
		if (!(this.#apikey || this.#userid)) {
			throw new Error("You muse set userid and apikey first");
		}
		return Crypto.createHash("md5")
			.update(`${this.#userid + this.#apikey}`)
			.digest("hex");
	}
	async watcher(opts) {
		let _data = undefined;
		let _retry = 0;
		const {
			trxid
		} = opts
		while (true) {
			const { data: response } = await this.#createRequest({
				url: "/api/prepaid",
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
					"User-Agent": this.userAgent,
				},
				data: new URLSearchParams({
					key: this.#apikey,
					sign: this.#signature(),
					type: "status",
					trxid,
				}),
			});
			if (!response) {
				break;
			}
			const { result, data: _datas, message } = response;
			const data = _datas[0]
			_data = {
				result,
				data,
				message
			};
			if (!result) {
				break;
			}
			if (data["status"] !== "waiting") {
				break;
			}
			_retry += 1;
			if (_retry * 60 > 24000) {
				break;
			}
		}
		return _data;
	}
	/**
	 * Set User-Agent
	 */
	userAgent(Agent) {
		this.userAgent = Agent;
		return this;
	}
	async services(filter_type) {
		const { data } = await this.#createRequest({
			url: "/api/prepaid",
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				"User-Agent": this.userAgent,
			},
			data: new URLSearchParams({
				key: this.#apikey,
				sign: this.#signature(),
				type: "services",
				...(filter_type ? { filter_type } : {})
			}),
		});
		return data;
	}
	async profile() {
		const { data } = await this.#createRequest({
			url: "/api/profile",
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				"User-Agent": this.userAgent,
			},
			data: new URLSearchParams({
				key: this.#apikey,
				sign: this.#signature(),
			}),
		});
		return data;
	}
	async order(opts) {
		const { service, data_no, type = "order" } = opts;
		if (!service || !data_no) {
			throw new Error("need parameter service and data_no to place an order");
		}
		const _opts = {
			url: "/api/prepaid",
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				"User-Agent": this.userAgent,
			},
			data: new URLSearchParams({
				key: this.#apikey,
				sign: this.#signature(),
				service,
				data_no,
				type,
			}),
		};
		const { data: resp } = await this.#createRequest(_opts)
		const { result, data } = resp;
		if (!result || data === null) {
			return resp
		}
		return resp
	}
}
/*
C8YOAe9HsuPiOBZOFVttyXvQuuV8QxKWdKPXioNawPzO1v3qpAOf3ySXOV8pZom8
xzReQnGA
*/
export default AmpangPedia;
