'use-strict'

const dotenv = require('dotenv')
const assert = require('assert')

dotenv.config()

const {
    PORT,
    HOST,
    HOST_URL,
    SQL_SERVER,
    SQL_USER,
    SQL_PASSWORD,
    SQL_DATABASE,
    DOCKER_SQL_USER,
    DOCKER_SQL_PASSWORD,
    DOCKER_SQL_SERVER,
    DOCKER_SQL_DATABASE,
    GTFSR_API_KEY,
    GTFSR_API_URL,
    GTFSR_TEST_API_KEY,
    GTFSR_TEST_API_URL
} = process.env

const sqlEncrypt = process.env.SQL_ENCRYPT === 'true'
const parseJSON = process.env.PARSE_JSON === 'true'

assert(PORT, 'PORT is required')
assert(HOST, 'HOST is required')
assert(HOST_URL, 'HOST_URL is required')
assert(SQL_SERVER, 'SQL_SERVER is required')
assert(SQL_USER, 'SQL_USER is required')
assert(SQL_PASSWORD, 'SQL_PASSWORD is required')
assert(SQL_DATABASE, 'SQL_DATABASE is required')
assert(GTFSR_API_KEY, 'GTFSR_API_KEY is required')
assert(GTFSR_API_URL, 'GTFSR_API_URL is required')

const prod = {
    port: PORT,
    host: HOST,
    url: HOST_URL,
    gtfsr: {
        apiKey: GTFSR_API_KEY,
        apiUrl: GTFSR_API_URL
    },
    sql: {
        server: SQL_SERVER,
        database: SQL_DATABASE,
        user: SQL_USER,
        password: SQL_PASSWORD,
        parseJSON: parseJSON,
        options: {
            encrypt: sqlEncrypt,
            enableArithAbort: true
        }
    }
}

const test = {
    port: PORT,
    host: HOST,
    url: HOST_URL,
    gtfsr: {
        apiKey: GTFSR_TEST_API_KEY,
        apiUrl: GTFSR_TEST_API_URL
    },
    sql: {
        server: DOCKER_SQL_SERVER,
        database: DOCKER_SQL_DATABASE,
        user: DOCKER_SQL_USER,
        password: DOCKER_SQL_PASSWORD,
        parseJSON: parseJSON,
        options: {
            encrypt: sqlEncrypt,
            enableArithAbort: true
        }
    }
}

const dockerDbConfig = {
    server: DOCKER_SQL_SERVER,
    database: DOCKER_SQL_DATABASE,
    user: DOCKER_SQL_USER,
    password: DOCKER_SQL_PASSWORD,
    options: {
        enableArithAbort: true
    }
}

module.exports = {
    prod,
    test,
    dockerDbConfig
}