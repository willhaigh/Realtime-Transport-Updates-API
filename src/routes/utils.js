'use-strict'

const moment = require("moment");
require('moment/locale/en-ie');
moment.locale('en-ie')

// Get seconds since midnight
const getCurrentTimestamp = async => {
    let time = moment().format('LTS').split(':')
    time = (parseInt(time[0]) * 3600) + (parseInt(time[1]) * 60) + parseInt(time[2])
    return time
}

const getTimestampMinusNumMinutes = async (timestamp, numMinutes) => {
    let numSeconds = numMinutes * 60
    return timestamp - numSeconds
}

const getCurrentTimestampPlusOneHour = async => {
    let time = moment().add(1, 'h').format('LTS').split(':')
    time = (parseInt(time[0]) * 3600) + (parseInt(time[1]) * 60) + parseInt(time[2])
    return time
}

const getCurrentDate = async => {
    let date = moment().format('YYYYMMDD')
    return date
}

const getCurrentDay = async => {
    return moment().format('dddd')
}

const getWrappedDate = async => {
    return moment().subtract(1, 'd').format('YYYYMMDD')
}

const getWrappedDay = async => {
    return moment().subtract(1, 'd').format('dddd')
}

const getNextDayDate = async => {
    return moment().add(1, 'd').format('YYYYMMDD')
}

const getNextDay = async => {
    return moment().add(1, 'd').format('dddd')
}

// Check if time is between 00:00:00 and 05:59:59 (0 and 21009 seconds past midnight) - Latest wrapped departure time is 29:53:25 - 107075
const checkIfNightServices = async timeStamp => {
    if (timeStamp >= 0 && timeStamp <= 21599) {
        return true
    } else {
        return false
    }
}

// If night services (between 00:00 and 05:59:59), we need to make a query using wrapped times
const getWrappedTimestamp = async timestamp => {
    if (timestamp <= 21599) {
        timestamp = timestamp + (24 * 3600)
    }
    return timestamp
}

// Remove trips that are last stop in stop_sequence
const removeTripsAtLastStop = async (lastStops, trips) => {
    for (i = 0; i < lastStops.length; i++) {
        let lastStop = lastStops[i].recordset[0]
        if (lastStop['stop_sequence'] === trips[i]['stop_sequence']) {
            trips[i]['last_stop'] = true
        } else {
            trips[i]['last_stop'] = false
        }
    }
    return trips.filter(result => result['last_stop'] === false)
}

module.exports = {
    getCurrentTimestamp,
    getCurrentTimestampPlusOneHour,
    getTimestampMinusNumMinutes,
    getWrappedTimestamp,
    getCurrentDate,
    getWrappedDate,
    getNextDayDate,
    getCurrentDay,
    getWrappedDay,
    getNextDay,
    checkIfNightServices,
    removeTripsAtLastStop
}