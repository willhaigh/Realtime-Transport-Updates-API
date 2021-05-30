const dotenv = require('dotenv');

dotenv.config();

const {
	DOCKER_SQL_USER,
	DOCKER_SQL_PASSWORD,
	DOCKER_SQL_SERVER,
	DOCKER_SQL_DATABASE,
	STATE_TRANSIT_API_KEY
} = process.env;

const config = {
	agencies: [
		{
			agency_key: 'State Transit Sydney',
			url: 'https://api.transport.nsw.gov.au/v1/gtfs/schedule/buses/SMBSC008',
			agency_headers: 
			{
				Authorization: STATE_TRANSIT_API_KEY
			},
			exclude: [
			]
		}
	],
	csvOptions: {
		skip_lines_with_error: true
	}
};

const dockerDbConfig = {
	server: DOCKER_SQL_SERVER,
	database: DOCKER_SQL_DATABASE,
	user: DOCKER_SQL_USER,
	password: DOCKER_SQL_PASSWORD,
	requestTimeout: 60000,
	options: {
		enableArithAbort: true
	}
};

module.exports = {
	config,
	dockerDbConfig
};
