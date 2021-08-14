import { establishConnection } from '../connections';
import { UserPost } from '../entities/post';

export const createPost = (payload, email) => {
	return new Promise(async (resolve, reject) => {
		try {
			let imgUrl = payload['imgUrl'];
			let description = payload['description'];
			const connection = establishConnection();
			const repo = await connection.getRepository(UserPost);
			let userPost = new UserPost();
			userPost = {
				id: null,
				email: email,
				image_url: imgUrl,
				description: description,
				created_date: new Date()
			};
			let isSaved = await repo.save(userPost);
			return resolve(isSaved ? true : false);
		} catch (e) {
			console.log('Cannot create post', e);
			return reject(e);
		}
	});
};

export const getUserPost = (email) => {
	return new Promise(async (resolve, reject) => {
		try {
			const connection = establishConnection();
			const repo = connection.getRepository(UserPost);
			const userEmail = email;
			let additionalQuery = '';
			if (email) additionalQuery += `WHERE email ILIKE '${userEmail}'`;
			const userPosts = await repo.query(`SELECT * FROM user_post ${additionalQuery} ORDER BY created_date desc`);
			if (userPosts) return resolve(userPosts);
			return resolve([]);
		} catch (e) {
			console.log('Cannot get user post', e);
			return reject('Cannot get user post');
		}
	});
};

export const deleteUserPost = (userPostId: number, email: string) => {
	return new Promise(async (resolve, reject) => {
		try {
			const connection = establishConnection();
			const repo = connection.getRepository(UserPost);
			const query = `DELETE FROM user_post WHERE email ILIKE '${email}' AND id = '${userPostId}'`;
			const deletedUserPost = await repo.query(query);
			if (deletedUserPost) return resolve(true);
			return resolve(false);
		} catch (e) {
			console.log('Cannot delete user post', e);
			return reject('Cannot delete user post');
		}
	});
};
