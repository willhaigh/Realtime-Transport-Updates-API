// Mocha API
const { describe, it } = require('mocha');
// Assertions module - chai
const { assert } = require('chai');

// The code under test
const utils = require('../utils');

/**
 * Tests - Data Utils functions:
 */
describe('Data Utils functions:', () => {
	describe('loadSqlQueries', () => {
		const { loadSqlQueries } = utils;
		const { loadSqlQueriesResponseMock } = require('./mocks');
		describe('when I call loadSqlQueries with folderName queries', async () => {
			const sqlQueries = await loadSqlQueries('queries');
			it('should return a queries object with each query and its corresponding SQL query', () => {
				assert.equal(sqlQueries, loadSqlQueriesResponseMock);
			});
		});
	});

	describe('is_dir', () => {
		const { _testIsDir } = utils;
		const { join } = require('path');
		describe('when I call is_dir with folderName queries', async () => {
			const path = join(process.cwd(), 'src', 'data', 'queries');
			it('should return true', () => {
				assert.isTrue(_testIsDir(path));
			});
		});
	});

	describe('is_dir', () => {
		const { _testIsDir } = utils;
		const { join } = require('path');
		describe('when I call is_dir with folderName hello', async () => {
			const path = join(process.cwd(), 'src', 'data', 'hello');
			it('should return false', () => {
				assert.isFalse(_testIsDir(path));
			});
		});
	});
});
