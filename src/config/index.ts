require('dotenv').config();

const generalConfig = {
	port: process.env.PORT || 4001
};

const securityConfig = {
	jwtTime: process.env.JWTTIME || 1000 * 60 * 300,
	jwtKey: process.env.SECRET_KEY
};

const dbConfig = {
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	username: process.env.DB_USER,
	password: process.env.DB_PWD,
	database: process.env.DB_NAME
};
export { dbConfig, generalConfig, securityConfig };
