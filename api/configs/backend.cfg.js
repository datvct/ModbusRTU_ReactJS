const config = {
	environment: "development",
	originBackend: "http://localhost:3001",
	port: 3001,
	session: {
		secret: "!@#$%^&*()",
		resave: true,
		saveUninitialized: true,
		maxAge: 24 * 60 * 60 * 1000, // 24 hours
	},
	database: {
		mysql: {
			connectionLimit: 500,
			host: "localhost",
			user: "root",
			password: "120501",
			database: "modbus",
			port: 3306,
		},
	},
	originFrontend: "http://localhost:5000",
};

module.exports = config;
