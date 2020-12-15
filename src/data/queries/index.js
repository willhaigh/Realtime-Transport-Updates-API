'use-strict'

const utils = require('../utils')

const register = async ({ sql, getConnection }) => {
    const sqlQueries = await utils.loadSqlQueries('queries')

    const getStopById = async stopId => {
        const cnx = await getConnection()
        const request = await cnx.request()
        request.input('stopId', sql.VarChar(50), stopId)
        return request.query(sqlQueries.getStopById)
    }

    const getRouteById = async routeId => {
        const cnx = await getConnection()
        const request = await cnx.request()
        request.input('routeId', sql.VarChar(50), routeId)
        return request.query(sqlQueries.getRouteById)
    }

    const getAgencyById = async agencyId => {
        const cnx = await getConnection()
        const request = await cnx.request()
        request.input('agencyId', sql.VarChar(50), agencyId)
        return request.query(sqlQueries.getAgencyById)
    }

    const getShapeById = async shapeId => {
        const cnx = await getConnection()
        const request = await cnx.request()
        request.input('shapeId', sql.VarChar(50), shapeId)
        return request.query(sqlQueries.getShapeById)
    }

    const getTransfersFromStopId = async stopId => {
        const cnx = await getConnection()
        const request = await cnx.request()
        request.input('stopId', sql.VarChar(50), stopId)
        return request.query(sqlQueries.getTransfersFromStopId)
    }

    const getTransfersToStopId = async stopId => {
        const cnx = await getConnection()
        const request = await cnx.request()
        request.input('stopId', sql.VarChar(50), stopId)
        return request.query(sqlQueries.getTransfersToStopId)
    }

    const getTripById = async tripId => {
        const cnx = await getConnection()
        const request = await cnx.request()
        request.input('tripId', sql.VarChar(50), tripId)
        return request.query(sqlQueries.getTripById)
    }

    const getLastStopsOnRoute = async trips => {
        const cnx = await getConnection()
        let results = []
        if(trips) {
            for (trip of trips) {
                let request = await cnx.request()
                request.input('trip_index', sql.Int, trip['trip_index'])
                results.push(await request.query(sqlQueries.getLastStopOnTrip))
            }
        }
        return results
    }

    const getStopTimesByTripId = async tripId => {
        const cnx = await getConnection()
        const request = await cnx.request()
        request.input('tripId', sql.VarChar(50), tripId)
        return request.query(sqlQueries.getStopTimesByTripId)
    }

    const getTripsAtStopId = async ({ stopId, scheduleDate, scheduleDay, currentTimestampMinusNumMinutes, currentTimestampPlusOneHour }) => {
        const cnx = await getConnection()
        const request = await cnx.request()
        request.input('stopId', sql.VarChar(50), stopId)
        request.input('currentDate', sql.Int, scheduleDate)
        request.input('currentDay', sql.VarChar(50), scheduleDay)
        request.input('currentTimestampMinusNumMinutes', sql.Int, currentTimestampMinusNumMinutes)
        request.input('currentTimestampPlusOneHour', sql.Int, currentTimestampPlusOneHour)
        return request.query(sqlQueries[scheduleDay])
    }

    const getTripsAtStopIdWithNightServices = async ({ stopId, scheduleDate, nextDayDate, scheduleDay, currentTimestampPlusOneHour, wrappedCurrentTimestampMinusNumMinutes, wrappedCurrentTimestampPlusOneHour }) => {
        const cnx = await getConnection()
        const request = await cnx.request()
        request.input('stopId', sql.VarChar(50), stopId)
        request.input('currentDate', sql.Int, scheduleDate)
        request.input('nextDayDate', sql.Int, nextDayDate)
        request.input('currentDay', sql.VarChar(50), scheduleDay)
        request.input('currentTimestampPlusOneHour', sql.Int, currentTimestampPlusOneHour)
        request.input('wrappedCurrentTimestampMinusNumMinutes', sql.Int, wrappedCurrentTimestampMinusNumMinutes)
        request.input('wrappedCurrentTimestampPlusOneHour', sql.Int, wrappedCurrentTimestampPlusOneHour)
        var query = sqlQueries[scheduleDay + 'Night']
        return request.query(query)
    }

    

    return {
        getAgencyById,
        getLastStopsOnRoute,
        getRouteById,
        getShapeById,
        getStopById,
        getStopTimesByTripId,
        getTransfersFromStopId,
        getTransfersToStopId,
        getTripsAtStopId,
        getTripsAtStopIdWithNightServices,
        getTripById
    }
}

module.exports = { register }