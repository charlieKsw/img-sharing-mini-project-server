import app from '../src/app';
const request = require('supertest');

// Sample Jest features - https://jestjs.io/docs/asynchronous
describe('Server status', () => {
	it('Server is up', async () => {
		const response = await request(app).get('/');
		expect(response.text).toEqual('Hello World! Server is up.');
		expect(response.statusCode).toBe(200);
	});
});
