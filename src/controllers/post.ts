import * as Utils from '../utils';
import * as Post from '../services/post';

export const createPost = async (req, res) => {
	try {
		await Utils.checkRequiredFields(req.body, [ 'imgUrl', 'description' ]);
		let payload = req.body;
		let { email } = req.user;
		let createdPost = await Post.createPost(payload, email);
		if (createdPost) return Utils.returnApiResponse(res, { success: true });
		return Utils.returnApiResponse(res, { error: 'Failed to create post' });
	} catch (e) {
		return Utils.returnApiResponse(res, { error: `Error in creating post - ${e}` }, 500);
	}
};

export const getUserPost = async (req, res) => {
	try {
		let { email } = req.user;
		let userPost = await Post.getUserPost(email);
		if (userPost) return Utils.returnApiResponse(res, { userPost });
		return Utils.returnApiResponse(res, { error: 'Failed to get user post' });
	} catch (e) {
		return Utils.returnApiResponse(res, { error: `Error in getting user post - ${e}` }, 500);
	}
};
