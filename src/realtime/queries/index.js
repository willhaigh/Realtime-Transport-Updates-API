'use-strict'

const utils = require('../utils')

const register = async getFeed => {

    const updateResultsWithRealtime = async query => {
        let feed = await getFeed()
        let queryTimestamp = query['query_timestamp']
        query['realtime_timestamp'] = feed.header.timestamp.low
        for (let element of query.response) {
            let feedEntity = feed.entity.find(obj => obj.id === element['trip_id'])
            if (feedEntity) {
                if (element['scheduleRelationship'] !== 3) {
                    element['isRealtime'] = true
                    if (feedEntity.tripUpdate.stopTimeUpdate) {
                        let stopTimeUpdates = feedEntity.tripUpdate.stopTimeUpdate
                        element = await utils.findNearestStopDelay(element, stopTimeUpdates)
                    }
                }
            } else {
                element['isRealtime'] = false
            }
            let departureTimestamp = element['departure_timestamp']
            let arrivalTimestamp = element['arrival_timestamp']
            if (departureTimestamp) {
                if (departureTimestamp < queryTimestamp) {
                    element['arrived'] = true
                } else {
                    element['due_in'] = await utils.getDueInValue(departureTimestamp, queryTimestamp)
                }
            } else if (arrivalTimestamp) {
                if (arrivalTimestamp < queryTimestamp) {
                    element['arrived'] = true
                } else {
                    element['due_in'] = await utils.getDueInValue(arrivalTimestamp, queryTimestamp)
                }
            } else {
                console.log('Error, no departure or arrival timestamp available...')
            }
        }
        // Remove trips arriving before current timestamp and cancelled trips
        query.response = query.response.filter(element => element.hasOwnProperty('arrived') === false)
        query.response = query.response.sort((a, b) => (a.arrival_timestamp >= b.arrival_timestamp) ? 1 : -1)
        return query
    }

    return {
        updateResultsWithRealtime
    }
}

module.exports = { register }