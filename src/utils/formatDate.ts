export const checkDate = (checkedDate, date = new Date()) => date <= checkedDate;

export const formatedTodayDate = () => {
	const date = new Date();
	const year = date.getFullYear();
	let month = date.getMonth() + 1;
	let day = date.getDate();
	return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
};

export const formatedStartDate = () => {
	const date = new Date();
	const year = date.getFullYear();
	let month = date.getMonth() + 1;
	let day = date.getDate() - 2;
	return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
};
