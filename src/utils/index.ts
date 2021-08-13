import { checkRequiredFields, returnApiResponse } from './api';

const timeout = (ms) => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};

export { checkRequiredFields, returnApiResponse, timeout };
