// Mocha API
const { describe, it } = require('mocha')
// Assertions module - chai
const { assert } = require('chai')
// Sinon for fakes, stubs, and spies
const sinon = require('sinon')

// The code under test
const utils = require('../utils')
const mocks = require('./mocks')

/**
 * Tests - Realtime feed based functions:
 */
describe('Realtime feed based functions', () => {
    describe('findNearestStopDelay', () => {
        const { findNearestStopDelay } = utils
        let element = mocks.elementForNearestStopDelayMock
        let stopTimeUpdates = mocks.stopTimeUpdatesNearestStopDelayMocks.tripUpdate.stopTimeUpdate
        
        describe('Calling findNearestStopDelay for trip: 18.2.60-151-d12-1.90.I at stop: 8220DB000297 using mocks from call obtained at Unix time 1606738523', async () => {
            let nearestDelay = await findNearestStopDelay(element, stopTimeUpdates)
            let response = mocks.mockNearestStopDelayResponseFor151
            
            it('should return element with updated departure and arrival timestamps = 45328, and departure and arrival time = 12:35:28', () => {
                assert.deepEqual(nearestDelay, response)
            })
        })
    })

    describe('filterFeed', () => {
        const { filterFeed } = utils

        describe('Calling filterFeed with feed captured at Unix time 1606738523', async () => {
            let feed = await mocks.getMockRealtimeFeed()
            let filteredFeed = await filterFeed(feed)

            it('should return a feed with only entities with an id containing d12 or b12', () => {
                for (let feedEntity of filteredFeed.entity) {
                    if (!(feedEntity['id'].includes('b12')) || !(feedEntity['id'].includes('d12'))) {
                        assert.fail(0, 1, 'FeedEntity id contains b12 or d12')
                    }
                }
                assert.isOk('everything', 'filteredFeed contains only entities with id containing d12 or b12')
            })
        })
    })

    describe('getDueInValue', () => {
        const { getDueInValue } = utils
        
        describe('Calling with arrivalTimestamp: 45328 and timestamp: 44139', async () => {
            let dueValue = await getDueInValue(45328, 44139)

            it('should return the value: 20', () => {
                assert.equal(dueValue, 20)
            })
        })

        describe('Calling with arrivalTimestamp: 44139 and timestamp: 44139', async () => {
            let dueValue = await getDueInValue(44139, 44139)

            it('should return the value: Due', () => {
                assert.equal(dueValue, 'Due')
            })
        })
    })

    describe('getTimestampAsTimeFormatted', () => {
        const { getTimestampAsTimeFormatted } = utils

        describe('Calling with timestamp: 45328', async () => {
            let formattedTime = await getTimestampAsTimeFormatted(45328)

            it('should return the value: 12:35:28', () => {
                assert.equal(formattedTime, '12:35:28')
            })
        })

        describe('Calling with timestamp: 0', async () => {
            let formattedTime = await getTimestampAsTimeFormatted(0)

            it('should return the value: 00:00:00', () => {
                assert.equal(formattedTime, '00:00:00')
            })
        })
    })

    describe('getCurrentTimestamp', () => {
        const { getCurrentTimestamp } = utils
        describe('when current time is: 13:43:30', () => {
            beforeEach(() => {
                this.clock = sinon.useFakeTimers(Date.UTC(2020, 10, 24, 13, 43, 30))
            })

            afterEach(() => {
                this.clock.restore()
            })

            it('should return the time as the number of seconds since midnight timestamp: 49410', async () => {
                let timestamp = getCurrentTimestamp()
                assert.equal(timestamp, 49410)
            })
        })

        describe('when current time is: 00:00:00', () => {
            beforeEach(() => {
                this.clock = sinon.useFakeTimers(Date.UTC(2020, 10, 24, 00, 00, 00))
            })

            afterEach(() => {
                this.clock.restore()
            })

            it('should return the time as the number of seconds since midnight timestamp: 0', async () => {
                let timestamp = getCurrentTimestamp()
                assert.equal(timestamp, 0)
            })
        })

        describe('when current time is: 13:43:30', () => {
            beforeEach(() => {
                this.clock = sinon.useFakeTimers(Date.UTC(2020, 10, 24, 13, 43, 30))
            })

            afterEach(() => {
                this.clock.restore()
            })

            it('should return the time as the number of seconds since midnight timestamp: 49410', async () => {
                let timestamp = getCurrentTimestamp()
                assert.equal(timestamp, 49410)
            })
        })
    })
})