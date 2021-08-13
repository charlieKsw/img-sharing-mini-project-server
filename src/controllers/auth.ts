import * as Utils from '../utils';
import * as User from '../services/user';

import { jwtEncryption } from '../middleware/jwt';
import { saltedPw, checkPw } from '../utils/bcrypt';

export const login = async (req, res) => {
	try {
		await Utils.checkRequiredFields(req.body, [ 'email', 'password' ]);
		let loginPayload = req.body;

		// 1. Verify if the user exists or not (User Object)
		let userObj = await User.verifyUser(loginPayload);

		// 2. Check user password
		const verifiedUser = await User.verifyUserLoginPw(loginPayload);
		if (!verifiedUser)
			return Utils.returnApiResponse(res, { isIncorrectPwd: true, error: `Incorrect email / password` }, 400);

		// 3. Encrypt user data with jwt
		const token = await jwtEncryption(userObj);

		if (verifiedUser)
			return Utils.returnApiResponse(res, {
				token,
				loginInTimePeriod: userObj['login_in_time_period']
			});
		return Utils.returnApiResponse(res, { error: `Incorrect email / password` });
	} catch (e) {
		return Utils.returnApiResponse(res, { error: `Cannot login - ${e}` }, 500);
	}
};

export const updateResetPassword = async (req, res) => {
	try {
		await Utils.checkRequiredFields(req.body, [ 'oldPassword', 'newPassword' ]);
		let { oldPassword, newPassword } = req.body;
		let { email } = req.user;

		// Verify oldPwd with dbSalted password
		let adminUser = await User.getAdminUser(email);
		let verifiedOldPwd: Boolean = await checkPw(String(oldPassword), adminUser['password']);
		if (!verifiedOldPwd)
			return Utils.returnApiResponse(res, { error: `Incorrect old password input, please try again` });

		// Saved newPwd to DB
		let secondSaltedPwd = await saltedPw(newPassword);
		let updateProfileResult: Boolean = await User.updateAdminUser(email, { password: String(secondSaltedPwd) });
		if (updateProfileResult) return Utils.returnApiResponse(res, { profileUpdated: true });
		return Utils.returnApiResponse(res, { error: `Failed to reset password` });
	} catch (e) {
		return Utils.returnApiResponse(res, { error: `Failed to reset password - ${e}` }, 500);
	}
};
