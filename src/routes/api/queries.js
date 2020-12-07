'use-strict'
const fs = require('fs')
const utils = require('../utils')

// Takes a server as an argument and uses that server to register a route
// We get our database plugin by accessing plugins property on server, which registers sql plugin, sql plugin exposes client object
module.exports.register = async server => {
    server.route({
        method: 'GET',
        path: '/api/stops/{id}',
        handler: async request => {
            try {
                const db = request.server.plugins.sql.client
                const realtime = request.server.plugins.realtime.client
                const stopId = request.params.id
                const currentTimestamp = utils.getCurrentTimestamp()
                let query = { queryTimestamp: currentTimestamp }
                const res = await db.queries.getStopById(stopId)
                query['response'] = res.recordset
                return query // Returns automatically as JSON
            } catch(err) {
                console.log(err) 
            }
        }
    })

    server.route({
        method: 'GET',
        path: '/api/routes/{id}',
        handler: async request => {
            try {
                const db = request.server.plugins.sql.client
                const routeId = request.params.id
                const currentTimestamp = utils.getCurrentTimestamp()
                let query = { queryTimestamp: currentTimestamp }
                const res = await db.queries.getRouteById(routeId)
                query['response'] = res.recordset
                return query
            } catch(err) {
                console.log(err)
            }
        }
    })

    server.route({
        method: 'GET',
        path: '/api/tripsAtStop/{id}',
        handler: async request => {
            try {
                const db = request.server.plugins.sql.client
                const realtime = request.server.plugins.realtime.client
                const stopId = request.params.id
                const currentTimestamp = utils.getCurrentTimestamp()
                const currentTimestampMinusNumMinutes = await utils.getTimestampMinusNumMinutes(currentTimestamp, 10) // Num minutes set to 10
                const currentTimestampPlusOneHour = utils.getCurrentTimestampPlusOneHour()
                let query
                let scheduleDay, scheduleDate
                // If currentTimestampMinusNumMinutes is on or after midnight set schedule day to be day before current day
                if(await utils.checkIfNightServices(currentTimestampMinusNumMinutes)) {
                    scheduleDay = utils.getWrappedDay().toLowerCase()
                    scheduleDate = utils.getWrappedDate()
                } else {
                    scheduleDay = utils.getCurrentDay().toLowerCase()
                    scheduleDate = utils.getCurrentDate()
                }
                // Check if currentTimesampPlusOneHour is on or after midnight
                // If true, we get wrapped times and call a getTripsAtStopIdWithNightServices query instead
                // If false call getTripsAtStopId as normal
                if (await utils.checkIfNightServices(currentTimestampPlusOneHour)) {
                    query = { query_timestamp: await utils.getWrappedTimestamp(currentTimestamp) }
                    return await getTripsWithMidnightServices({ db, stopId, realtime, query, currentTimestampMinusNumMinutes, currentTimestampPlusOneHour, scheduleDate, scheduleDay })
                } else {
                    query = { query_timestamp: currentTimestamp }
                    return await getTrips({ db, stopId, realtime, query, currentTimestampMinusNumMinutes, currentTimestampPlusOneHour, scheduleDate, scheduleDay})
                }
            } catch(err) {
                console.log(err)
            }
        }
    })
}

const getTripsWithMidnightServices = async ({ db, stopId, realtime, query, currentTimestampMinusNumMinutes, currentTimestampPlusOneHour, scheduleDate, scheduleDay}) => {
    const wrappedCurrentTimestampMinusNumMinutes = await utils.getWrappedTimestamp(currentTimestampMinusNumMinutes)
    const wrappedCurrentTimestampPlusOneHour = await utils.getWrappedTimestamp(currentTimestampPlusOneHour)
    const nextDayDate = await utils.checkIfNightServices(currentTimestampMinusNumMinutes) ? utils.getCurrentDate() : utils.getNextDayDate()
    const res = await db.queries.getTripsAtStopIdWithNightServices( { stopId, scheduleDate, nextDayDate, scheduleDay, currentTimestampPlusOneHour, wrappedCurrentTimestampMinusNumMinutes, wrappedCurrentTimestampPlusOneHour } )
    const lastStops = await db.queries.getLastStopsOnRoute(res.recordset)
    res.recordset = await utils.removeTripsAtLastStop(lastStops, res.recordset)
    query['response'] = res.recordset
    res.recordset = await realtime.queries.updateResultsWithRealtime(query)
    return query
}

const getTrips = async ({ db, stopId, realtime, query, currentTimestampMinusNumMinutes, currentTimestampPlusOneHour, scheduleDate, scheduleDay}) => {
    const res = await db.queries.getTripsAtStopId( { stopId, scheduleDate, scheduleDay, currentTimestampMinusNumMinutes, currentTimestampPlusOneHour } )
    const lastStops = await db.queries.getLastStopsOnRoute(res.recordset)
    res.recordset = await utils.removeTripsAtLastStop(lastStops, res.recordset)
    query['response'] = res.recordset
    res.recordset = await realtime.queries.updateResultsWithRealtime(query)
    return query
}