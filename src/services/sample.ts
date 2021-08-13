import { Pool, Client } from 'pg';
import { establishConnection } from '../connections';
import { Sample } from '../entities/sample';
import * as Configs from '../config';

// **** Sample query ****
// const pool = new Pool(emxPool);
// const query = `SELECT * FROM house.withdrawal_requests LIMIT 10`;
// const result = await pool.query(query);

const createSample = (payload) => {
	return new Promise(async (resolve, reject) => {
		try {
			const { name, email } = payload;
			const connection = establishConnection();
			const repo = connection.getRepository(Sample);
			let sample = new Sample();
			sample = {
				id: 1,
				name: name,
				email: email,
				status: false,
				created_date: new Date()
			};
			await repo.save(sample);
			resolve('Sample is saved');
		} catch (e) {
			reject(e);
		}
	});
};

export { createSample };
