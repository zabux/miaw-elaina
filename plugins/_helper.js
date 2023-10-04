import { plugins } from "../lib/plugins.js";

import pkg from "string-similarity";
const similarity = pkg;
import Helper from "../lib/helper.js";

function Matches(text) {
	let plugins_ = [];
	for (let name in plugins) {
		let plugin = plugins[name];
		let push = plugin.help || null;
		if (push == null) continue;
		plugins_.push(...push);
	}
	let matches;
	let parser = similarity.findBestMatch(text, plugins_);
	matches = parser.bestMatch.target.split(" ")[0] || null;
	return matches;
}
function searchStr(text) {
	let plugins_ = [];
	for (let name in plugins) {
		let plugin = plugins[name];
		let push = plugin.help || null;
		if (push == null) continue;
		plugins_.push(...push);
	}
	if (plugins_.indexOf(text.replace(Helper.prefix, "")) > -1) {
		return true;
	} else if (
		plugins_.indexOf(text.replace(Helper.prefix, "").split(" ")[0]) > -1
	) {
		return true;
	} else {
		return false;
	}
}
export async function all(m) {
	let prefix = Helper.prefix;
	let text = m.text;
	let pars = text.split(" ");
	if (!text) return;
	if (!text.match(prefix)) return;
	let plugins_ = await searchStr(text.split(" ")[0]);
	if (plugins_ == false) {
		m.reply(
			`Mungkin yang kamu maksud *${text.match(prefix)[0] + Matches(text)}*`
		);
	}
}
