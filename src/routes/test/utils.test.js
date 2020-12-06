// Mocha API
const { afterEach, beforeEach, describe, it } = require('mocha')
// Assertions module - chai
const { assert } = require('chai')
// Sinon for fakes, stubs, and spies
const sinon = require('sinon')

// The code under test
const utils = require('../utils')

/**
 * Tests - Momentjs based functions:
 */
describe('Momentjs based functions:', () => {
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

    describe('getCurrentTimestampPlusOneHour', () => {
        const { getCurrentTimestampPlusOneHour } = utils
        describe('when current time is: 13:43:30', () => {
            beforeEach(() => {
                this.clock = sinon.useFakeTimers(Date.UTC(2020, 10, 24, 13, 43, 30))
            })

            afterEach(() => {
                this.clock.restore()
            })

            it('should return the time plus one hour 14:43:30 as a number of seconds since midnight timestamp: 53010', async () => {
                assert.equal(await getCurrentTimestampPlusOneHour(), 53010)
            })
        })

        describe('when current time is: 23:59:59', () => {
            beforeEach(() => {
                this.clock = sinon.useFakeTimers(Date.UTC(2020, 10, 24, 23, 59, 59))
            })

            afterEach(() => {
                this.clock.restore()
            })

            it('should return the time plus one hour 00:59:59 as a number of seconds since midnight timestamp: 3599', async () => {
                assert.equal(await getCurrentTimestampPlusOneHour(), 3599)
            })
        })
    })

    describe('getTimestampMinusNumMinutes', () => {
        const { getTimestampMinusNumMinutes } = utils
        describe('when provided timestamp is: 49410 (13:43:30)', () => {
            it('should return the provided timestamp minus 25 minutes as a number of seconds since midnight timestamp: 47910', async () => {
                assert.equal(await getTimestampMinusNumMinutes(49410, 25), 47910)
            })
        })
    })

    describe('getCurrentDay', () => {
        const { getCurrentDay } = utils
        describe('when current day is: Tuesday', async () => {
            beforeEach(() => {
                this.clock = sinon.useFakeTimers(Date.UTC(2020, 10, 24, 13, 43, 30))
            })

            afterEach(() => {
                this.clock.restore()
            })

            it('should return: tuesday', async () => {
                assert.equal(await getCurrentDay(), 'Tuesday')
            })
        })
    })

    describe('getCurrentDate', () => {
        const { getCurrentDate } = utils
        describe('when current date is: 24th November 2020', async () => {
            beforeEach(() => {
                this.clock = sinon.useFakeTimers(Date.UTC(2020, 10, 24, 13, 43, 30))
            })

            afterEach(() => {
                this.clock.restore()
            })

            it('should return: 20201124', async () => {
                let currentDate = await getCurrentDate()
                assert.equal(currentDate, 20201124)
            })
        })
    })

    describe('getNextDay', () => {
        const { getNextDay } = utils
        describe('when current day is Friday', () => {
            beforeEach(() => {
                this.clock = sinon.useFakeTimers(Date.UTC(2020, 10, 27, 11, 27, 30))
            })

            afterEach(() => {
                this.clock.restore()
            })

            it('should return the following day: Saturday', async () => {
                let nextDay = await getNextDay()
                assert.equal(nextDay, 'Saturday')
            })
        })

        describe('when current day is Thursday on 31st Dec 2020', () => {
            beforeEach(() => {
                this.clock = sinon.useFakeTimers(Date.UTC(2020, 11, 31, 23, 00, 00))
            })

            afterEach(() => {
                this.clock.restore()
            })

            it('should return the following day: Friday', async () => {
                let nextDay = await getNextDay()
                assert.equal(nextDay, 'Friday')
            })
        })
    })

    describe('getNextDayDate', () => {
        const { getNextDayDate } = utils
        describe('when current date is Friday 27th November 2020', () => {
            beforeEach(() => {
                this.clock = sinon.useFakeTimers(Date.UTC(2020, 10, 27, 11, 27, 30))
            })

            afterEach(() => {
                this.clock.restore()
            })

            it('should return the following date: 20201128', async () => {
                let nextDayDate = getNextDayDate()
                assert.equal(nextDayDate, 20201128)
            })
        })

        describe('when current date is 31st December 2020', () => {
            beforeEach(() => {
                this.clock = sinon.useFakeTimers(Date.UTC(2020, 11, 31, 23, 00, 00))
            })

            afterEach(() => {
                this.clock.restore()
            })

            it('should return the following date: 20210101', async () => {
                let nextDayDate = await getNextDayDate()
                assert.equal(nextDayDate, '20210101')
            })
        })
    })
})

/**
 * Tests - Wrapped time / Night Services functions:
 */
describe('Wrapped time / Night Services functions:', () => {
    describe('checkifNightServices', () => {
        const { getCurrentTimestamp, checkIfNightServices } = utils
        describe('when current time is 01:15:00', () => {
            beforeEach(() => {
                this.clock = sinon.useFakeTimers(Date.UTC(2020, 10, 24, 01, 15, 00)) // 24 Nov 2020, 01:15:00
            })

            afterEach(() => {
                this.clock.restore()
            })

            it('should return: true', async () => {
                let timestamp = getCurrentTimestamp()
                assert.isTrue(await checkIfNightServices(timestamp))
            })
        })

        describe('when current time is 23:59:59', () => {
            beforeEach(() => {
                this.clock = sinon.useFakeTimers(Date.UTC(2020, 10, 24, 23, 59, 59)) // 23 Nov 2020, 23:50:00
            })

            afterEach(() => {
                this.clock.restore()
            })

            it('should return: false', async () => {
                let timestamp = getCurrentTimestamp()
                assert.isFalse(await checkIfNightServices(timestamp))
            })
        })

        describe('when current time is 00:00:00', () => {
            beforeEach(() => {
                this.clock = sinon.useFakeTimers(Date.UTC(2020, 10, 24, 00, 00, 00)) // 23 Nov 2020, 23:50:00
            })

            afterEach(() => {
                this.clock.restore()
            })

            it('should return: true', async () => {
                let timestamp = getCurrentTimestamp()
                assert.isTrue(await checkIfNightServices(timestamp))
            })
        })

        describe('when current time is 06:00:00', () => {
            beforeEach(() => {
                this.clock = sinon.useFakeTimers(Date.UTC(2020, 10, 24, 06, 00, 00)) // 23 Nov 2020, 23:50:00
            })

            afterEach(() => {
                this.clock.restore()
            })

            it('should return: false', async () => {
                let timestamp = getCurrentTimestamp()
                assert.isFalse(await checkIfNightServices(timestamp))
            })
        })

        describe('when current time is 05:59:59', () => {
            beforeEach(() => {
                this.clock = sinon.useFakeTimers(Date.UTC(2020, 10, 24, 05, 59, 59)) // 23 Nov 2020, 23:50:00
            })

            afterEach(() => {
                this.clock.restore()
            })

            it('should return: true', async () => {
                let timestamp = getCurrentTimestamp()
                assert.isTrue(await checkIfNightServices(timestamp))
            })
        })
    })

    describe('getWrappedTimestamp', () => {
        const { getCurrentTimestamp, getWrappedTimestamp } = utils
        describe('when provided timestamp is: 2715 (00:45:15)', () => {
            beforeEach(() => {
                this.clock = sinon.useFakeTimers(Date.UTC(2020, 10, 24, 00, 45, 15)) // 24 Nov 2020, 00:45:15
            })

            afterEach(() => {
                this.clock.restore()
            })

            it('should return wrapped timestamp: 89115', async () => {
                let timestamp = getCurrentTimestamp()
                assert.equal(await getWrappedTimestamp(timestamp), 89115)
            })
        })

        describe('when provided timestamp is: 49410 (13:43:30)', () => {
            beforeEach(() => {
                this.clock = sinon.useFakeTimers(Date.UTC(2020, 10, 24, 13, 43, 30)) // 24 Nov 2020, 13:43:30
            })

            afterEach(() => {
                this.clock.restore()
            })

            it('should return wrapped timestamp: 49410', async () => {
                let timestamp = getCurrentTimestamp()
                assert.equal(await getWrappedTimestamp(timestamp), 49410)
            })
        })
    })

    describe('getWrappedDate', () => {
        const { getWrappedDate } = utils
        describe('When current date is Friday 27th November 00:30:00', () => {
            beforeEach(() => {
                this.clock = sinon.useFakeTimers(Date.UTC(2020, 10, 27, 00, 00, 30)) // 27 Nov 2020, 00:00:30
            })

            afterEach(() => {
                this.clock.restore()
            })

            it('should return wrapped date Thursday 26th November as: 20201126', () => {
                let wrappedDate = getWrappedDate()
                assert.equal(wrappedDate, 20201126)
            })
        })
    })

    describe('getWrappedDay', () => {
        const { getWrappedDay } = utils
        describe('When current date is Friday 27th November 00:30:00', () => {
            beforeEach(() => {
                this.clock = sinon.useFakeTimers(Date.UTC(2020, 10, 27, 00, 00, 30)) // 27 Nov 2020, 00:00:30
            })

            afterEach(() => {
                this.clock.restore()
            })

            it('should return wrapped day Thursday', () => {
                let wrappedDay = getWrappedDay()
                assert.equal(wrappedDay, 'Thursday')
            })
        })
    })

})

/**
 * Tests - List of trips functions:
 */
describe('List of trips functions:', () => {
    const mocks = require('./mocks')
    describe('removeTripsAtLastStop', () => {
        const { removeTripsAtLastStop } = utils
        describe('When I call removeTripsAtLastStop with a list of trips all with stop_sequence as the last stop and a corresponding list of the last stops of those trips', async () => {
            let trips = await removeTripsAtLastStop(mocks.lastStopsMock1, mocks.tripsMockAllLastStops)
            it('should return an empty list trips with all trips removed', () => {
                assert.isEmpty(trips)
            })
        })

        describe('When I call removeTripsAtLastStop with a list of trips with no stop_sequence as the last stop', async () => {
            let trips = await removeTripsAtLastStop(mocks.lastStopsMock1, mocks.tripsMock1)
            it('should return the list of trips with no trips removed', () => {
                assert.equal(trips.length, mocks.tripsMock1.length)
            })
        })

        describe('When I call removeTripsAtLastStop with a list of trips with some trips at last stop', async () => {
            let trips = await removeTripsAtLastStop(mocks.lastStopsMock1, mocks.tripsMock2)
            it('should return a list of trips with only trips at last stop removed', () => {
                assert.equal(trips.length, 4)
            })
        })
    })
})