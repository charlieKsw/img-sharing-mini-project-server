import { establishConnection } from '../connections';
import { AdminUser } from '../entities/user';
import { saltedPw, checkPw } from '../utils/bcrypt';

const isUserExist = (email) => {
	// To check whether user Email already in db
	return new Promise(async (resolve, reject) => {
		try {
			const connection = establishConnection();
			const repo = connection.getRepository(AdminUser);
			const adminUser = await repo.findOne({ where: `"email" ILIKE '${email}'` });
			return resolve(adminUser ? true : null);
		} catch (e) {
			console.log('Error in checking user email', e);
			return reject('Error in checking user email');
		}
	});
};

export const createAdminUser = (payload) => {
	return new Promise(async (resolve, reject) => {
		try {
			const { password, email } = payload;
			const connection = establishConnection();
			const repo = connection.getRepository(AdminUser);
			let saltedPwd = await saltedPw(password); // Salt the hashed password
			// To check whether user account exists in DB
			const isUserEmailExistResult = await isUserExist(payload.email);
			if (!isUserEmailExistResult) {
				let adminUser = new AdminUser();
				adminUser = {
					id: null,
					email: email,
					password: String(saltedPwd),
					is_login_enabled_period: null,
					last_login_time: null,
					created_date: new Date()
				};
				let isSaved = await repo.save(adminUser);
				if (isSaved) return resolve(true);
				console.log('Admin account is created');
			} else {
				console.log('Duplicate email found in db.');
				return resolve(false);
			}
		} catch (e) {
			reject(e);
		}
	});
};

export const getAdminUser = (email) => {
	return new Promise(async (resolve, reject) => {
		try {
			const connection = establishConnection();
			const repo = connection.getRepository(AdminUser);
			const adminUser = await repo.findOne({ where: `"email" = '${email}'` });
			if (adminUser) return resolve(adminUser);
			return resolve(null);
		} catch (e) {
			console.log('Error in getting user Id', e);
			return reject('Error in getting user id');
		}
	});
};

export const getAdminUserInfo = (userId) => {
	return new Promise(async (resolve, reject) => {
		try {
			const connection = establishConnection();
			const repo = connection.getRepository(AdminUser);
			let additionalQuery = '';
			if (userId) additionalQuery += `WHERE id = ${userId}`;
			const adminUser = await repo.query(`SELECT * FROM admin_user ${additionalQuery}`);
			if (adminUser) return resolve(adminUser);
			return resolve(null);
		} catch (e) {
			console.log('Error in getting user Id', e);
			return reject('Error in getting user id');
		}
	});
};

export const updateAdminUser = (email, newObj) => {
	return new Promise<Boolean>(async (resolve) => {
		try {
			const connection = establishConnection();
			const repo = connection.getRepository(AdminUser);
			let adminUser = await repo.findOne({ where: `"email" = '${email}'` });
			// updating new password to db
			adminUser = {
				...adminUser,
				...newObj
			};
			let isSaved = await repo.save(adminUser);
			return resolve(isSaved ? true : false);
		} catch (e) {
			console.log('Failed to save new password');
			return resolve(false);
		}
	});
};

export const verifyUserLoginPw = (loginPayload) => {
	return new Promise(async (resolve, reject) => {
		try {
			let { email, password } = loginPayload;
			const connection = establishConnection();
			const repo = await connection.getRepository(AdminUser);
			let adminUser = await repo.findOne({ where: `"email" = '${email}'` });
			let saltedPwd = adminUser && adminUser['password'];
			// compare hashedPW with payload password
			const checkHashedPW: boolean = await checkPw(password, saltedPwd);
			return resolve(checkHashedPW ? true : false);
		} catch (e) {
			console.log('Cannot login - ', e);
			return reject('Cannot login in');
		}
	});
};

export const verifyUser = (payload) => {
	// User login portal and verify user
	return new Promise(async (resolve, reject) => {
		try {
			const { email } = payload;
			const connection = establishConnection();
			const repo = connection.getRepository(AdminUser);
			const verifyUser = await repo.findOne({ where: `"email" ILIKE '${email}'` });
			if (verifyUser && payload.email === verifyUser['email']) {
				return resolve({ ...verifyUser, password: 'DO NOT CRACK IT' });
			}
			return reject('Cannot find user');
		} catch (e) {
			console.log('Error in verifying username', e);
			return reject('username does not exsit');
		}
	});
};
