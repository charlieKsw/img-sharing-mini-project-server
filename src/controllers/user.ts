import * as Utils from '../utils';
import * as AdminUser from '../services/user';

const createUser = async (req, res) => {
	try {
		await Utils.checkRequiredFields(req.body, [ 'email', 'password' ]);
		let { email } = req.body;
		let createdAdminUser = await AdminUser.createAdminUser(req.body);
		if (createdAdminUser) return Utils.returnApiResponse(res, { success: true, email });
		return Utils.returnApiResponse(res, { error: 'User email already exist.' });
	} catch (e) {
		return Utils.returnApiResponse(res, { error: `Cannot create user - ${e}` }, 500);
	}
};
const getAdminUserInfo = async (req, res) => {
	try {
		let { userId } = req.body;
		const adminUser = await AdminUser.getAdminUserInfo(userId);
		return Utils.returnApiResponse(res, { adminUser });
	} catch (e) {
		return Utils.returnApiResponse(res, { error: `Cannot get user id - ${e}` }, 500);
	}
};

const verifyUser = async (req, res) => {
	try {
		await Utils.checkRequiredFields(req.body, [ 'email', 'password' ]);
		let { email } = req.body;
		let verify = await AdminUser.verifyUser(req.body);
		if (verify) return Utils.returnApiResponse(res, { email });
		return Utils.returnApiResponse(res, { error: `Cannot verify user` });
	} catch (e) {
		return Utils.returnApiResponse(res, { error: `Cannot verify user - ${e}` }, 500);
	}
};

export { createUser, getAdminUserInfo, verifyUser };
