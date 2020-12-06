'use-strict'

const dotenv = require('dotenv')
const assert = require('assert')

dotenv.config()

const {
    PORT,
    HOST,
    HOST_URL,
    PORT_TEST,
    HOST_TEST,
    HOST_TEST_URL,
    SQL_SERVER,
    SQL_USER,
    SQL_PASSWORD,
    SQL_DATABASE,
    SQL_TEST_USER,
    SQL_TEST_PASSWORD,
    SQL_TEST_SERVER,
    SQL_TEST_DATABASE,
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
            encypt: sqlEncrypt,
            enableArithAbort: true
        }
    }
}

const test = {
    port: PORT,
    host: HOST,
    url: HOST_URL,
    gtfsr: {
        apiKey: GTFSR_API_KEY,
        apiUrl: GTFSR_API_URL
    },
    sql: {
        server: SQL_TEST_SERVER,
        database: SQL_TEST_DATABASE,
        user: SQL_TEST_USER,
        password: SQL_TEST_PASSWORD,
        parseJSON: parseJSON,
        options: {
            encypt: sqlEncrypt,
            enableArithAbort: true
        }
    }
}

module.exports = {
    prod,
    test
}