let handler = (m) => m;

handler.before = function (m) {
	let user = global.db.data.users[m.sender];
	let role =
		user.level <= 2
			? "Newbie ㋡"
			: user.level >= 2 && user.level <= 4
			? "Beginner Grade 1 ⚊¹"
			: user.level >= 4 && user.level <= 6
			? "Beginner Grade 2 ⚊²"
			: user.level >= 6 && user.level <= 8
			? "Beginner Grade 3 ⚊³"
			: user.level >= 8 && user.level <= 10
			? "Beginner Grade 4 ⚊⁴"
			: user.level >= 10 && user.level <= 20
			? "Private Grade 1 ⚌¹"
			: user.level >= 20 && user.level <= 30
			? "Private Grade 2 ⚌²"
			: user.level >= 30 && user.level <= 40
			? "Private Grade 3 ⚌³"
			: user.level >= 40 && user.level <= 50
			? "Private Grade 4 ⚌⁴"
			: user.level >= 50 && user.level <= 60
			? "Private Grade 5 ⚌⁵"
			: user.level >= 60 && user.level <= 70
			? "Corporal Grade 1 ☰¹"
			: user.level >= 70 && user.level <= 80
			? "Corporal Grade 2 ☰²"
			: user.level >= 80 && user.level <= 90
			? "Corporal Grade 3 ☰³"
			: user.level >= 90 && user.level <= 100
			? "Corporal Grade 4 ☰⁴"
			: user.level >= 100 && user.level <= 110
			? "Corporal Grade 5 ☰⁵"
			: user.level >= 110 && user.level <= 120
			? "Sergeant Grade 1 ≣¹"
			: user.level >= 120 && user.level <= 130
			? "Sergeant Grade 2 ≣²"
			: user.level >= 130 && user.level <= 140
			? "Sergeant Grade 3 ≣³"
			: user.level >= 140 && user.level <= 150
			? "Sergeant Grade 4 ≣⁴"
			: user.level >= 150 && user.level <= 160
			? "Sergeant Grade 5 ≣⁵"
			: user.level >= 160 && user.level <= 170
			? "Staff Grade 1 ﹀¹"
			: user.level >= 170 && user.level <= 180
			? "Staff Grade 2 ﹀²"
			: user.level >= 180 && user.level <= 190
			? "Staff Grade 3 ﹀³"
			: user.level >= 190 && user.level <= 200
			? "Staff Grade 4 ﹀⁴"
			: user.level >= 200 && user.level <= 210
			? "Staff Grade 5 ﹀⁵"
			: user.level >= 210 && user.level <= 220
			? "Sergeant Grade 1 ︾¹"
			: user.level >= 220 && user.level <= 230
			? "Sergeant Grade 2 ︾²"
			: user.level >= 230 && user.level <= 240
			? "Sergeant Grade 3 ︾³"
			: user.level >= 240 && user.level <= 250
			? "Sergeant Grade 4 ︾⁴"
			: user.level >= 250 && user.level <= 260
			? "Sergeant Grade 5 ︾⁵"
			: user.level >= 260 && user.level <= 270
			? "2nd Lt. Grade 1 ♢¹"
			: user.level >= 270 && user.level <= 280
			? "2nd Lt. Grade 2 ♢²"
			: user.level >= 280 && user.level <= 290
			? "2nd Lt. Grade 3 ♢³"
			: user.level >= 290 && user.level <= 300
			? "2nd Lt. Grade 4 ♢⁴"
			: user.level >= 300 && user.level <= 310
			? "2nd Lt. Grade 5 ♢⁵"
			: user.level >= 310 && user.level <= 320
			? "1st Lt. Grade 1 ♢♢¹"
			: user.level >= 320 && user.level <= 330
			? "1st Lt. Grade 2 ♢♢²"
			: user.level >= 330 && user.level <= 340
			? "1st Lt. Grade 3 ♢♢³"
			: user.level >= 340 && user.level <= 350
			? "1st Lt. Grade 4 ♢♢⁴"
			: user.level >= 350 && user.level <= 360
			? "1st Lt. Grade 5 ♢♢⁵"
			: user.level >= 360 && user.level <= 370
			? "Major Grade 1 ✷¹"
			: user.level >= 370 && user.level <= 380
			? "Major Grade 2 ✷²"
			: user.level >= 380 && user.level <= 390
			? "Major Grade 3 ✷³"
			: user.level >= 390 && user.level <= 400
			? "Major Grade 4 ✷⁴"
			: user.level >= 400 && user.level <= 410
			? "Major Grade 5 ✷⁵"
			: user.level >= 410 && user.level <= 420
			? "Colonel Grade 1 ✷✷¹"
			: user.level >= 420 && user.level <= 430
			? "Colonel Grade 2 ✷✷²"
			: user.level >= 430 && user.level <= 440
			? "Colonel Grade 3 ✷✷³"
			: user.level >= 440 && user.level <= 450
			? "Colonel Grade 4 ✷✷⁴"
			: user.level >= 450 && user.level <= 460
			? "Colonel Grade 5 ✷✷⁵"
			: user.level >= 460 && user.level <= 470
			? "Brigadier Early ✰"
			: user.level >= 470 && user.level <= 480
			? "Brigadier Silver ✩"
			: user.level >= 480 && user.level <= 490
			? "Brigadier gold ✯"
			: user.level >= 490 && user.level <= 500
			? "Brigadier Platinum ✬"
			: user.level >= 500 && user.level <= 600
			? "Brigadier Diamond ✪"
			: user.level >= 600 && user.level <= 700
			? "Legendary 忍"
			: user.level >= 700 && user.level <= 800
			? "Legendary 忍忍"
			: user.level >= 800 && user.level <= 900
			? "Legendary 忍忍忍"
			: user.level >= 900 && user.level <= 1000
			? "Legendary忍忍忍忍"
			: "Master 숒 × Legendary 숒";
	user.role = role;
	return true;
};

export default handler;
