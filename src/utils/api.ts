const checkRequiredFields = (request, fields = []) => {
	return new Promise(async (resolve, reject) => {
		let missing = '';

		fields.map((field) => {
			if (!(field in request)) {
				missing += `${field} `;
			}
			return missing;
		});

		if (missing !== '') {
			return reject(`${String(missing)}is missing`);
		}

		return resolve(true);
	});
};

const returnApiResponse = (res, message: Object, code = 200) => {
	res.status(code).json({
		success: code === 200 ? true : false,
		...message
	});
};

export { checkRequiredFields, returnApiResponse };
