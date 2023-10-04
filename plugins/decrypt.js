import { spawn } from "child_process";
import { extname, join } from "path";

const decrypt = async (m, { conn, usedPrefix, command }) => {
	const q = m.quoted ? m.quoted : m;
	const fileName =
		(q.msg || q).title || q?.message?.documentMessage?.title || "";
	const known_ext = extname(fileName);
	if (
		!fileName ||
		!known_ext ||
		/jpg|jpeg|png|webp|svg|mp4|mp3|ogg|wav|mkv/i.test(known_ext)
	) {
		return;
	}

	const encrypted = (await q.download()).toString();
	const execute_file = join(__dirname(), "decrypt.py");

	const args = spawn("python3", [execute_file, encrypted, known_ext]);

	let out = "";
	args.stdout.on("data", (chunk) => {
		out += chunk?.toString();
	});
	args.on("exit", () => {
		m.reply(out);
	});
};
decrypt["command"] = ["decrypt"];
decrypt["premium"] = true;

export default decrypt;
