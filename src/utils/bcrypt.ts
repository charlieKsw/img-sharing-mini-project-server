const bcrypt = require('bcrypt');
const saltRounds = 10;

const saltedPw = (password) => {
	return new Promise(async (resolve, reject) => {
		try {
			const salt = await bcrypt.genSalt(saltRounds);
			const saltedPw = await bcrypt.hash(password, salt);
			if (saltedPw) return resolve(saltedPw);
			return resolve('Error in salting pwd');
		} catch (e) {
			console.log('Error in salting pwd - ', e);
			return reject('Error in salting pwd');
		}
	});
};

const checkPw = (password, saltedPwd) => {
	return new Promise<boolean>(async (resolve, reject) => {
		try {
			const checkResult = await bcrypt.compare(password, saltedPwd);
			if (checkResult) return resolve(true);
			return resolve(false);
		} catch (e) {
			reject(e);
		}
	});
};

export { saltedPw, checkPw };
