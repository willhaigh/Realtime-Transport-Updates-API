'use-strict'

const moment = require("moment");
require('moment/locale/en-ie');
moment.locale('en-ie')

const findNearestStopDelay = async (element, stopTimeUpdates) => {
    for(index = stopTimeUpdates.length - 1; index >= 0; index--) {
        if (stopTimeUpdates[index].stopSequence <= element['stop_sequence']) {
            let departureDelay = stopTimeUpdates[index].departure ? stopTimeUpdates[index].departure.delay : 0
            let arrivalDelay = stopTimeUpdates[index].arrival ? stopTimeUpdates[index].arrival.delay : 0
            element['departure_timestamp'] += departureDelay
            element['arrival_timestamp'] += arrivalDelay
            element['departure_time'] = await getTimestampAsTimeFormatted(element['departure_timestamp'])
            element['arrival_time'] = await getTimestampAsTimeFormatted(element['arrival_timestamp'])
            break
        }
    }
    return element
}

const filterFeed = async feed => {
    feed.entity = feed.entity.filter(function (feedEntity) {
        return feedEntity['id'].includes('b12')
        || feedEntity['id'].includes('d12')
    })
    return feed
}

const getDueInValue = async ( arrivalTimestamp, timestamp ) => {
    let eta = arrivalTimestamp - timestamp
    return eta = eta >= 60 ? Math.round(eta / 60).toString() : 'Due'
}

const getTimestampAsTimeFormatted = async timestamp => {
    let time = [0, 0, 0]
    time[0] = String(Math.floor(Math.floor(timestamp / 3600))).padStart(2, '0')
    time[1] = String(Math.floor(Math.floor(timestamp / 60) % 60) % 60).padStart(2, '0')
    time[2] = String(timestamp % 60).padStart(2, '0')
    return time.join(':')
}

// Get seconds since midnight
const getCurrentTimestamp = async => {
    let time = moment().format('LTS').split(':')
    time = (parseInt(time[0]) * 3600) + (parseInt(time[1]) * 60) + parseInt(time[2])
    return time
}

const getCurrentTime = async => {
    return moment().format('LTS')
}

module.exports = {
    findNearestStopDelay,
    filterFeed,
    getDueInValue,
    getTimestampAsTimeFormatted,
    getCurrentTimestamp,
    getCurrentTime
}