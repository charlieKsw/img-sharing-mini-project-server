import { createConnection, getConnection, ConnectionOptions } from 'typeorm';
import * as Configs from '../config';

const connectionConfig: ConnectionOptions = {
	name: 'connection',
	type: 'postgres',
	host: Configs.dbConfig.host,
	port: parseFloat(Configs.dbConfig.port),
	username: Configs.dbConfig.username,
	password: Configs.dbConfig.password,
	database: Configs.dbConfig.database,
	entities: [ __dirname + '/../entities/*{.ts,.js}' ],
	synchronize: true
};

export const connection = createConnection(connectionConfig);

const establishConnection = () => {
	return getConnection('connection');
};

export { establishConnection };
