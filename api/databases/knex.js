const knex = require("knex");
const backendConfig = require("../configs/backend.cfg");
const dbConfig = backendConfig.database.mysql;

const knexClient = knex({
	client: "mysql",
	connection: {
		host: dbConfig.host,
		user: dbConfig.user,
		password: dbConfig.password,
		database: dbConfig.database,
		port: dbConfig.port,
	},
	pool: {
		min: 2,
		max: 50,
	},
});

const checkConnection = async () => {
	try {
		const data = await knexClient.raw("SELECT 1 + 1 AS total");
		if (data && data[0] && data[0][0] && data[0][0]["total"] === 2) {
			console.log("mysql: connected to db");
		} else {
			throw new Error("cannot connect to db");
		}
	} catch (e) {
		console.log("connect to db error");
		console.error(e);
	}
};

checkConnection();

module.exports = knexClient;
