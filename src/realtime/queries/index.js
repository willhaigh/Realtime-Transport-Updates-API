'use-strict';

const utils = require('../utils');

/* eslint-disable no-await-in-loop, max-depth */
const register = async getFeed => {
	const updateResultsWithRealtime = async query => {
		const feed = await getFeed();
		if (feed) {
			try {
				query.realtime_timestamp = feed.header.timestamp.low;
				const secondsSinceMidnightTimestamp = query.since_midnight_timestamp;
				//console.log(query.response);
				//console.log("query " + query.trip_id);
				for (let element of query.response) {
					//const feedEntity = feed.entity.find(object => object.id === element.trip_id);
					//console.log("Element" + element.trip_id);
					//console.log("objecy" + JSON.stringify(feed.entity.find(object => object.id === '3936_280805_2453_44'), null, 4));
					//const testEntity = feed.entity.find(object => object.id === '3936_280805_2453_44');
					//const testEntity = feed.entity.tripUpdate.trip.find(object => object.tripId === '1353921');
					//const testEntity2 	= feed.entity.find(object => object.id === '3936_280805_2453_44');
					//console.log(element.trip_id);
					//console.log("object" + JSON.stringify((testEntity.tripUpdate.trip.tripId), null, 4));
			
					feed.entity.forEach(function(entity) {
						if (entity.tripUpdate && entity.tripUpdate.trip.tripId === element.trip_id) {
						 //console.log(element);
						  //console.log(entity.tripUpdate.trip.tripId);
						 //console.log(entity.tripUpdate.trip.tripId);
						 
						 element.is_realtime = true;
						 if (entity.tripUpdate.stopTimeUpdate && element.scheduleRelationship !== 0) {
							console.log(element);
							const stopTimeUpdates = entity.tripUpdate.stopTimeUpdate;
							element = utils.findNearestStopDelay(element, stopTimeUpdates); 
							
						//	console.log(stopTimeUpdates);
						 }	
						}
						else {
							//console.log(JSON.stringify(element, null, 4));
							
							element.is_realtime = false;
						} 
					  })
					  
					//console.log("object2" + JSON.stringify(feed.entity, null, 4));
					//console.log(object);
					//console.log(feedEntity);
			/* 		if (feedEntity) {
						//console.log("feed entity" + feedEntity);
						//if (element.scheduleRelationship !== 'NO_DATA') {
							element.is_realtime = true;
							if (feedEntity.tripUpdate.stopTimeUpdate) {
								const stopTimeUpdates = feedEntity.tripUpdate.stopTimeUpdate;
								element = await utils.findNearestStopDelay(element, stopTimeUpdates);
							}
						//}
					} else {
						//console.log(JSON.stringify(element, null, 4));
						
						element.is_realtime = false;
					} */

					const departureTimestamp = element.departure_timestamp;
					const arrivalTimestamp = element.arrival_timestamp;
				console.log(departureTimestamp);
					// If departure/arrival timestamp is before the time we made the query, set arrived to be true, arrived trips will be filtered out
					if (departureTimestamp) {
						
						if (departureTimestamp < secondsSinceMidnightTimestamp) {
							element.arrived = true;
						} else {
							element.due_in = await utils.getDueInValue(departureTimestamp, secondsSinceMidnightTimestamp);
					
						}
					} else if (arrivalTimestamp) {
						if (arrivalTimestamp < secondsSinceMidnightTimestamp) {
							element.arrived = true;
						} else {
							element.due_in = await utils.getDueInValue(arrivalTimestamp, secondsSinceMidnightTimestamp);
						}
					} else {
						console.log('Error, no departure or arrival timestamp available...');
					}

					// Convert any wrapped times and timestamps to normal times e.g convert 25:30:00 to 01:30:00
					if (departureTimestamp >= 86400) {
						const unWrappedTimestamp = await utils.getWrappedTimeStampUnwrapped(departureTimestamp);
						element.departure_timestamp = unWrappedTimestamp;
						element.departure_time = await utils.getTimestampAsTimeFormatted(unWrappedTimestamp);
					}

					if (arrivalTimestamp >= 86400) {
						const unWrappedTimestamp = await utils.getWrappedTimeStampUnwrapped(arrivalTimestamp);
						element.arrival_timestamp = arrivalTimestamp;
						element.arrival_time = await utils.getTimestampAsTimeFormatted(unWrappedTimestamp);
					}
				}
			} catch {
				console.log('No realtime feed available...');
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
