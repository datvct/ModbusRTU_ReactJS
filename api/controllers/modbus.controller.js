const knex = require("../databases/knex");

module.exports = {
	get: async (req, res, next) => {
		try {
			const devices = await knex("devices").select();
			res.status(200).json({
				success: true,
				data: devices,
			});
		} catch (err) {
			next(err);
		}
	},
};
