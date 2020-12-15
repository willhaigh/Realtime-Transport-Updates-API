'use-strict';

const utils = require('../utils');

/* eslint-disable no-await-in-loop */
const register = async getFeed => {
	const updateResultsWithRealtime = async query => {
		const feed = await getFeed();
		const queryTimestamp = query.query_timestamp;
		query.realtime_timestamp = feed.header.timestamp.low;
		for (let element of query.response) {
			const feedEntity = feed.entity.find(object => object.id === element.trip_id);
			if (feedEntity) {
				if (element.scheduleRelationship !== 3) {
					element.isRealtime = true;
					if (feedEntity.tripUpdate.stopTimeUpdate) {
						const stopTimeUpdates = feedEntity.tripUpdate.stopTimeUpdate;
						element = await utils.findNearestStopDelay(element, stopTimeUpdates);
					}
				}
			} else {
				element.isRealtime = false;
			}

			const departureTimestamp = element.departure_timestamp;
			const arrivalTimestamp = element.arrival_timestamp;
			if (departureTimestamp) {
				if (departureTimestamp < queryTimestamp) {
					element.arrived = true;
				} else {
					element.due_in = await utils.getDueInValue(departureTimestamp, queryTimestamp);
				}
			} else if (arrivalTimestamp) {
				if (arrivalTimestamp < queryTimestamp) {
					element.arrived = true;
				} else {
					element.due_in = await utils.getDueInValue(arrivalTimestamp, queryTimestamp);
				}
			} else {
				console.log('Error, no departure or arrival timestamp available...');
			}
		}

		// Remove trips arriving before current timestamp and cancelled trips
		query.response = query.response.filter(element => Object.prototype.hasOwnProperty.call(element, 'arrived') === false);
		query.response = query.response.sort((a, b) => (a.arrival_timestamp >= b.arrival_timestamp) ? 1 : -1);
		return query;
	};

	return {
		updateResultsWithRealtime
	};
};

module.exports = { register };
