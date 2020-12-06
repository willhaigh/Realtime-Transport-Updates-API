'use-strict'

const loadSqlQueriesResponseMock = {
    getLastStopOnTrip: 'SELECT TOP(1) trip_id\n' +
        '\t, stop_id\n' +
        '\t, stop_sequence\n' +
        'FROM stop_times\n' +
        'WHERE trip_index = @trip_index\n' +
        'ORDER BY stop_sequence DESC',
    getRouteById: 'SELECT * \nFROM [dbo].[routes]\nWHERE [route_id] = @routeId',
    getStopById: 'SELECT * \nFROM [dbo].[stops] \nWHERE [stop_id] = @stopId',
    friday: 'SELECT [t].[trip_id]\n' +
        '    , [t].[trip_index]\n' +
        '    , [t].[trip_headsign]\n' +
        '    , [t].[route_id]\n' +
        '    , [st].[stop_id]\n' +
        '    , [st].[stop_headsign]\n' +
        '    , [t].[service_id]\n' +
        '    , [t].[direction_id]\n' +
        '    , [st].[arrival_time]\n' +
        '    , [st].[arrival_timestamp]\n' +
        '    , [st].[departure_time]\n' +
        '    , [st].[departure_timestamp]\n' +
        '    , [st].[stop_sequence]\n' +
        '    , [t].[shape_id]\n' +
        '    , [st].[shape_dist_traveled]\n' +
        'FROM stop_times st, trips t\n' +
        'WHERE [st].[stop_id] = @stopId\n' +
        'AND [st].[trip_index] = [t].[trip_index]\n' +
        'AND [t].[service_id] IN ( \n' +
        '    SELECT [service_id]\n' +
        '    FROM calendar\n' +
        '    WHERE [start_date] <= @currentDate \n' +
        '    AND [end_date] >= @currentDate \n' +
        '    AND friday = 1\n' +
        '    UNION\n' +
        '    SELECT [service_id] FROM calendar_dates\n' +
        '    WHERE [date] = @currentDate AND [exception_type] = 1\n' +
        '    EXCEPT\n' +
        '    SELECT [service_id] FROM calendar_dates\n' +
        '    WHERE [date] = @currentDate AND [exception_type] = 2\n' +
        ')\n' +
        'AND [st].[departure_timestamp] >= @currentTimestamp\n' +
        'AND [st].[departure_timestamp] <= @currentTimestampPlusOneHour\n' +
        'AND [st].[pickup_type] = 0\n' +
        'ORDER BY [st].[departure_timestamp]',
    monday: 'SELECT [t].[trip_id]\n' +
        '    , [t].[trip_index]\n' +
        '    , [t].[trip_headsign]\n' +
        '    , [t].[route_id]\n' +
        '    , [st].[stop_id]\n' +
        '    , [st].[stop_headsign]\n' +
        '    , [t].[service_id]\n' +
        '    , [t].[direction_id]\n' +
        '    , [st].[arrival_time]\n' +
        '    , [st].[arrival_timestamp]\n' +
        '    , [st].[departure_time]\n' +
        '    , [st].[departure_timestamp]\n' +
        '    , [st].[stop_sequence]\n' +
        '    , [t].[shape_id]\n' +
        '    , [st].[shape_dist_traveled]\n' +
        'FROM stop_times st, trips t\n' +
        'WHERE [st].[stop_id] = @stopId\n' +
        'AND [st].[trip_index] = [t].[trip_index]\n' +
        'AND [t].[service_id] IN (\n' +
        '    SELECT [service_id]\n' +
        '    FROM calendar\n' +
        '    WHERE [start_date] <= @currentDate\n' +
        '    AND [end_date] >= @currentDate\n' +
        '    AND monday = 1\n' +
        '    UNION\n' +
        '    SELECT [service_id] FROM calendar_dates\n' +
        '    WHERE [date] = @currentDate AND [exception_type] = 1\n' +
        '    EXCEPT\n' +
        '    SELECT [service_id] FROM calendar_dates\n' +
        '    WHERE [date] = @currentDate AND [exception_type] = 2\n' +
        ')\n' +
        'AND [st].[departure_timestamp] >= @currentTimestamp\n' +
        'AND [st].[departure_timestamp] <= @currentTimestampPlusOneHour\n' +
        'AND [st].[pickup_type] = 0\n' +
        'ORDER BY [st].[departure_timestamp]',
    saturday: 'SELECT [t].[trip_id]\n' +
        '    , [t].[trip_index]\n' +
        '    , [t].[trip_headsign]\n' +
        '    , [t].[route_id]\n' +
        '    , [st].[stop_id]\n' +
        '    , [st].[stop_headsign]\n' +
        '    , [t].[service_id]\n' +
        '    , [t].[direction_id]\n' +
        '    , [st].[arrival_time]\n' +
        '    , [st].[arrival_timestamp]\n' +
        '    , [st].[departure_time]\n' +
        '    , [st].[departure_timestamp]\n' +
        '    , [st].[stop_sequence]\n' +
        '    , [t].[shape_id]\n' +
        '    , [st].[shape_dist_traveled]\n' +
        'FROM stop_times st, trips t\n' +
        'WHERE [st].[stop_id] = @stopId\n' +
        'AND [st].[trip_index] = [t].[trip_index]\n' +
        'AND [t].[service_id] IN ( \n' +
        '    SELECT [service_id]\n' +
        '    FROM calendar\n' +
        '    WHERE [start_date] <= @currentDate \n' +
        '    AND [end_date] >= @currentDate \n' +
        '    AND saturday = 1\n' +
        '    UNION\n' +
        '    SELECT [service_id] FROM calendar_dates\n' +
        '    WHERE [date] = @currentDate AND [exception_type] = 1\n' +
        '    EXCEPT\n' +
        '    SELECT [service_id] FROM calendar_dates\n' +
        '    WHERE [date] = @currentDate AND [exception_type] = 2\n' +
        ')\n' +
        'AND [st].[departure_timestamp] >= @currentTimestamp\n' +
        'AND [st].[departure_timestamp] <= @currentTimestampPlusOneHour\n' +
        'AND [st].[pickup_type] = 0\n' +
        'ORDER BY [st].[departure_timestamp]',
    sunday: 'SELECT [t].[trip_id]\n' +
        '    , [t].[trip_index]\n' +
        '    , [t].[trip_headsign]\n' +
        '    , [t].[route_id]\n' +
        '    , [st].[stop_id]\n' +
        '    , [st].[stop_headsign]\n' +
        '    , [t].[service_id]\n' +
        '    , [t].[direction_id]\n' +
        '    , [st].[arrival_time]\n' +
        '    , [st].[arrival_timestamp]\n' +
        '    , [st].[departure_time]\n' +
        '    , [st].[departure_timestamp]\n' +
        '    , [st].[stop_sequence]\n' +
        '    , [t].[shape_id]\n' +
        '    , [st].[shape_dist_traveled]\n' +
        'FROM stop_times st, trips t\n' +
        'WHERE [st].[stop_id] = @stopId\n' +
        'AND [st].[trip_index] = [t].[trip_index]\n' +
        'AND [t].[service_id] IN ( \n' +
        '    SELECT [service_id]\n' +
        '    FROM calendar\n' +
        '    WHERE [start_date] <= @currentDate \n' +
        '    AND [end_date] >= @currentDate \n' +
        '    AND sunday = 1\n' +
        '    UNION\n' +
        '    SELECT [service_id] FROM calendar_dates\n' +
        '    WHERE [date] = @currentDate AND [exception_type] = 1\n' +
        '    EXCEPT\n' +
        '    SELECT [service_id] FROM calendar_dates\n' +
        '    WHERE [date] = @currentDate AND [exception_type] = 2\n' +
        ')\n' +
        'AND [st].[departure_timestamp] >= @currentTimestamp\n' +
        'AND [st].[departure_timestamp] <= @currentTimestampPlusOneHour\n' +
        'AND [st].[pickup_type] = 0\n' +
        'ORDER BY [st].[departure_timestamp]',
    thursday: 'SELECT [t].[trip_id]\n' +
        '    , [t].[trip_index]\n' +
        '    , [t].[trip_headsign]\n' +
        '    , [t].[route_id]\n' +
        '    , [st].[stop_id]\n' +
        '    , [st].[stop_headsign]\n' +
        '    , [t].[service_id]\n' +
        '    , [t].[direction_id]\n' +
        '    , [st].[arrival_time]\n' +
        '    , [st].[arrival_timestamp]\n' +
        '    , [st].[departure_time]\n' +
        '    , [st].[departure_timestamp]\n' +
        '    , [st].[stop_sequence]\n' +
        '    , [t].[shape_id]\n' +
        '    , [st].[shape_dist_traveled]\n' +
        'FROM stop_times st, trips t\n' +
        'WHERE [st].[stop_id] = @stopId\n' +
        'AND [st].[trip_index] = [t].[trip_index]\n' +
        'AND [t].[service_id] IN ( \n' +
        '    SELECT [service_id]\n' +
        '    FROM calendar\n' +
        '    WHERE [start_date] <= @currentDate \n' +
        '    AND [end_date] >= @currentDate \n' +
        '    AND thursday = 1\n' +
        '    UNION\n' +
        '    SELECT [service_id] FROM calendar_dates\n' +
        '    WHERE [date] = @currentDate AND [exception_type] = 1\n' +
        '    EXCEPT\n' +
        '    SELECT [service_id] FROM calendar_dates\n' +
        '    WHERE [date] = @currentDate AND [exception_type] = 2\n' +
        ')\n' +
        'AND [st].[departure_timestamp] >= @currentTimestamp\n' +
        'AND [st].[departure_timestamp] <= @currentTimestampPlusOneHour\n' +
        'AND [st].[pickup_type] = 0\n' +
        'ORDER BY [st].[departure_timestamp]',
    tuesday: 'SELECT [t].[trip_id]\n' +
        '    , [t].[trip_index]\n' +
        '    , [t].[trip_headsign]\n' +
        '    , [t].[route_id]\n' +
        '    , [st].[stop_id]\n' +
        '    , [st].[stop_headsign]\n' +
        '    , [t].[service_id]\n' +
        '    , [t].[direction_id]\n' +
        '    , [st].[arrival_time]\n' +
        '    , [st].[arrival_timestamp]\n' +
        '    , [st].[departure_time]\n' +
        '    , [st].[departure_timestamp]\n' +
        '    , [st].[stop_sequence]\n' +
        '    , [t].[shape_id]\n' +
        '    , [st].[shape_dist_traveled]\n' +
        'FROM stop_times st, trips t\n' +
        'WHERE [st].[stop_id] = @stopId\n' +
        'AND [st].[trip_index] = [t].[trip_index]\n' +
        'AND [t].[service_id] IN ( \n' +
        '    SELECT [service_id]\n' +
        '    FROM calendar\n' +
        '    WHERE [start_date] <= @currentDate \n' +
        '    AND [end_date] >= @currentDate \n' +
        '    AND tuesday = 1\n' +
        '    UNION\n' +
        '    SELECT [service_id] FROM calendar_dates\n' +
        '    WHERE [date] = @currentDate AND [exception_type] = 1\n' +
        '    EXCEPT\n' +
        '    SELECT [service_id] FROM calendar_dates\n' +
        '    WHERE [date] = @currentDate AND [exception_type] = 2\n' +
        ')\n' +
        'AND [st].[departure_timestamp] >= @currentTimestamp\n' +
        'AND [st].[departure_timestamp] <= @currentTimestampPlusOneHour\n' +
        'AND [st].[pickup_type] = 0\n' +
        'ORDER BY [st].[departure_timestamp]',
    wednesday: 'SELECT [t].[trip_id]\n' +
        '    , [t].[trip_index]\n' +
        '    , [t].[trip_headsign]\n' +
        '    , [t].[route_id]\n' +
        '    , [st].[stop_id]\n' +
        '    , [st].[stop_headsign]\n' +
        '    , [t].[service_id]\n' +
        '    , [t].[direction_id]\n' +
        '    , [st].[arrival_time]\n' +
        '    , [st].[arrival_timestamp]\n' +
        '    , [st].[departure_time]\n' +
        '    , [st].[departure_timestamp]\n' +
        '    , [st].[stop_sequence]\n' +
        '    , [t].[shape_id]\n' +
        '    , [st].[shape_dist_traveled]\n' +
        'FROM stop_times st, trips t\n' +
        'WHERE [st].[stop_id] = @stopId\n' +
        'AND [st].[trip_index] = [t].[trip_index]\n' +
        'AND [t].[service_id] IN ( \n' +
        '    SELECT [service_id]\n' +
        '    FROM calendar\n' +
        '    WHERE [start_date] <= @currentDate \n' +
        '    AND [end_date] >= @currentDate \n' +
        '    AND wednesday = 1\n' +
        '    UNION\n' +
        '    SELECT [service_id] FROM calendar_dates\n' +
        '    WHERE [date] = @currentDate AND [exception_type] = 1\n' +
        '    EXCEPT\n' +
        '    SELECT [service_id] FROM calendar_dates\n' +
        '    WHERE [date] = @currentDate AND [exception_type] = 2\n' +
        ')\n' +
        'AND [st].[departure_timestamp] >= @currentTimestamp\n' +
        'AND [st].[departure_timestamp] <= @currentTimestampPlusOneHour\n' +
        'AND [st].[pickup_type] = 0\n' +
        'ORDER BY [st].[departure_timestamp]',
    fridayNight: 'SELECT [t].[trip_id]\n' +
        '    , [t].[trip_index]\n' +
        '    , [t].[trip_headsign]\n' +
        '    , [t].[route_id]\n' +
        '    , [st].[stop_id]\n' +
        '    , [st].[stop_headsign]\n' +
        '    , [t].[service_id]\n' +
        '    , [t].[direction_id]\n' +
        '    , [st].[arrival_time]\n' +
        '    , [st].[arrival_timestamp]\n' +
        '    , [st].[departure_time]\n' +
        '    , [st].[departure_timestamp]\n' +
        '    , [st].[stop_sequence]\n' +
        '    , [t].[shape_id]\n' +
        '    , [st].[shape_dist_traveled]\n' +
        'FROM trips t, stop_times st\n' +
        'WHERE st.stop_id = @stopId\n' +
        'AND st.trip_id = t.trip_id\n' +
        'AND t.service_id IN (\n' +
        '\tSELECT [service_id]\n' +
        '\t\tFROM calendar\n' +
        '\t\tWHERE [start_date] <= @currentDate\n' +
        '\t\tAND [end_date] >= @currentDate\n' +
        '\t\tAND friday = 1\n' +
        '\t\tUNION\n' +
        '\t\tSELECT [service_id] FROM calendar_dates\n' +
        '\t\tWHERE [date] = @currentDate AND [exception_type] = 1\n' +
        '\t\tEXCEPT\n' +
        '\t\tSELECT [service_id] FROM calendar_dates\n' +
        '\t\tWHERE [date] = @currentDate AND [exception_type] = 2\n' +
        '\t)\n' +
        'AND [st].[departure_timestamp] >= @wrappedCurrentTimestamp\n' +
        'AND [st].[departure_timestamp] <= @wrappedCurrentTimestampPlusOneHour\n' +
        'AND [st].[pickup_type] = 0\n' +
        '\n' +
        'UNION\n' +
        '\n' +
        'SELECT [t].[trip_id]\n' +
        '    , [t].[trip_index]\n' +
        '    , [t].[trip_headsign]\n' +
        '    , [t].[route_id]\n' +
        '    , [st].[stop_id]\n' +
        '    , [st].[stop_headsign]\n' +
        '    , [t].[service_id]\n' +
        '    , [t].[direction_id]\n' +
        '    , [st].[arrival_time]\n' +
        '    , [st].[arrival_timestamp]\n' +
        '    , [st].[departure_time]\n' +
        '    , [st].[departure_timestamp]\n' +
        '    , [st].[stop_sequence]\n' +
        '    , [t].[shape_id]\n' +
        '    , [st].[shape_dist_traveled]\n' +
        'FROM trips t, stop_times st\n' +
        'WHERE st.stop_id = @stopId\n' +
        'AND st.trip_id = t.trip_id\n' +
        'AND t.service_id IN (\n' +
        '\tSELECT [service_id]\n' +
        '\t\tFROM calendar\n' +
        '\t\tWHERE [start_date] <= @nextDayDate\n' +
        '\t\tAND [end_date] >= @nextDayDate\n' +
        '\t\tAND saturday = 1\n' +
        '\t\tUNION\n' +
        '\t\tSELECT [service_id] FROM calendar_dates\n' +
        '\t\tWHERE [date] = @nextDayDate AND [exception_type] = 1\n' +
        '\t\tEXCEPT\n' +
        '\t\tSELECT [service_id] FROM calendar_dates\n' +
        '\t\tWHERE [date] = @nextDayDate AND [exception_type] = 2\n' +
        '\t)\n' +
        'AND [st].[departure_timestamp] <= @currentTimestampPlusOneHour\n' +
        'AND [st].[pickup_type] = 0\n' +
        'ORDER BY [st].[departure_timestamp]',
    mondayNight: 'SELECT [t].[trip_id]\n' +
        '    , [t].[trip_index]\n' +
        '    , [t].[trip_headsign]\n' +
        '    , [t].[route_id]\n' +
        '    , [st].[stop_id]\n' +
        '    , [st].[stop_headsign]\n' +
        '    , [t].[service_id]\n' +
        '    , [t].[direction_id]\n' +
        '    , [st].[arrival_time]\n' +
        '    , [st].[arrival_timestamp]\n' +
        '    , [st].[departure_time]\n' +
        '    , [st].[departure_timestamp]\n' +
        '    , [st].[stop_sequence]\n' +
        '    , [t].[shape_id]\n' +
        '    , [st].[shape_dist_traveled]\n' +
        'FROM trips t, stop_times st\n' +
        'WHERE st.stop_id = @stopId\n' +
        'AND st.trip_id = t.trip_id\n' +
        'AND t.service_id IN (\n' +
        '\tSELECT [service_id]\n' +
        '\t\tFROM calendar\n' +
        '\t\tWHERE [start_date] <= @currentDate\n' +
        '\t\tAND [end_date] >= @currentDate\n' +
        '\t\tAND monday = 1\n' +
        '\t\tUNION\n' +
        '\t\tSELECT [service_id] FROM calendar_dates\n' +
        '\t\tWHERE [date] = @currentDate AND [exception_type] = 1\n' +
        '\t\tEXCEPT\n' +
        '\t\tSELECT [service_id] FROM calendar_dates\n' +
        '\t\tWHERE [date] = @currentDate AND [exception_type] = 2\n' +
        '\t)\n' +
        'AND [st].[departure_timestamp] >= @wrappedCurrentTimestamp\n' +
        'AND [st].[departure_timestamp] <= @wrappedCurrentTimestampPlusOneHour\n' +
        'AND [st].[pickup_type] = 0\n' +
        '\n' +
        'UNION\n' +
        '\n' +
        'SELECT [t].[trip_id]\n' +
        '    , [t].[trip_index]\n' +
        '    , [t].[trip_headsign]\n' +
        '    , [t].[route_id]\n' +
        '    , [st].[stop_id]\n' +
        '    , [st].[stop_headsign]\n' +
        '    , [t].[service_id]\n' +
        '    , [t].[direction_id]\n' +
        '    , [st].[arrival_time]\n' +
        '    , [st].[arrival_timestamp]\n' +
        '    , [st].[departure_time]\n' +
        '    , [st].[departure_timestamp]\n' +
        '    , [st].[stop_sequence]\n' +
        '    , [t].[shape_id]\n' +
        '    , [st].[shape_dist_traveled]\n' +
        '\t, [c].[date]\n' +
        'FROM trips t, stop_times st\n' +
        'WHERE st.stop_id = @stopId\n' +
        'AND st.trip_id = t.trip_id\n' +
        'AND t.service_id IN (\n' +
        '\tSELECT [service_id]\n' +
        '\t\tFROM calendar\n' +
        '\t\tWHERE [start_date] <= @nextDayDate\n' +
        '\t\tAND [end_date] >= @nextDayDate\n' +
        '\t\tAND tuesday = 1\n' +
        '\t\tUNION\n' +
        '\t\tSELECT [service_id] FROM calendar_dates\n' +
        '\t\tWHERE [date] = @nextDayDate AND [exception_type] = 1\n' +
        '\t\tEXCEPT\n' +
        '\t\tSELECT [service_id] FROM calendar_dates\n' +
        '\t\tWHERE [date] = @nextDayDate AND [exception_type] = 2\n' +
        '\t)\n' +
        'AND [st].[departure_timestamp] <= @currentTimestampPlusOneHour\n' +
        'AND [st].[pickup_type] = 0\n' +
        'ORDER BY [st].[departure_timestamp]',
    saturdayNight: 'SELECT [t].[trip_id]\n' +
        '    , [t].[trip_index]\n' +
        '    , [t].[trip_headsign]\n' +
        '    , [t].[route_id]\n' +
        '    , [st].[stop_id]\n' +
        '    , [st].[stop_headsign]\n' +
        '    , [t].[service_id]\n' +
        '    , [t].[direction_id]\n' +
        '    , [st].[arrival_time]\n' +
        '    , [st].[arrival_timestamp]\n' +
        '    , [st].[departure_time]\n' +
        '    , [st].[departure_timestamp]\n' +
        '    , [st].[stop_sequence]\n' +
        '    , [t].[shape_id]\n' +
        '    , [st].[shape_dist_traveled]\n' +
        'FROM trips t, stop_times st\n' +
        'WHERE st.stop_id = @stopId\n' +
        'AND st.trip_id = t.trip_id\n' +
        'AND t.service_id IN (\n' +
        '\tSELECT [service_id]\n' +
        '\t\tFROM calendar\n' +
        '\t\tWHERE [start_date] <= @currentDate\n' +
        '\t\tAND [end_date] >= @currentDate\n' +
        '\t\tAND saturday = 1\n' +
        '\t\tUNION\n' +
        '\t\tSELECT [service_id] FROM calendar_dates\n' +
        '\t\tWHERE [date] = @currentDate AND [exception_type] = 1\n' +
        '\t\tEXCEPT\n' +
        '\t\tSELECT [service_id] FROM calendar_dates\n' +
        '\t\tWHERE [date] = @currentDate AND [exception_type] = 2\n' +
        '\t)\n' +
        'AND [st].[departure_timestamp] >= @wrappedCurrentTimestamp\n' +
        'AND [st].[departure_timestamp] <= @wrappedCurrentTimestampPlusOneHour\n' +
        'AND [st].[pickup_type] = 0\n' +
        '\n' +
        'UNION\n' +
        '\n' +
        'SELECT [t].[trip_id]\n' +
        '    , [t].[trip_index]\n' +
        '    , [t].[trip_headsign]\n' +
        '    , [t].[route_id]\n' +
        '    , [st].[stop_id]\n' +
        '    , [st].[stop_headsign]\n' +
        '    , [t].[service_id]\n' +
        '    , [t].[direction_id]\n' +
        '    , [st].[arrival_time]\n' +
        '    , [st].[arrival_timestamp]\n' +
        '    , [st].[departure_time]\n' +
        '    , [st].[departure_timestamp]\n' +
        '    , [st].[stop_sequence]\n' +
        '    , [t].[shape_id]\n' +
        '    , [st].[shape_dist_traveled]\n' +
        'FROM trips t, stop_times st\n' +
        'WHERE st.stop_id = @stopId\n' +
        'AND st.trip_id = t.trip_id\n' +
        'AND t.service_id IN (\n' +
        '\tSELECT [service_id]\n' +
        '\t\tFROM calendar\n' +
        '\t\tWHERE [start_date] <= @nextDayDate\n' +
        '\t\tAND [end_date] >= @nextDayDate\n' +
        '\t\tAND sunday = 1\n' +
        '\t\tUNION\n' +
        '\t\tSELECT [service_id] FROM calendar_dates\n' +
        '\t\tWHERE [date] = @nextDayDate AND [exception_type] = 1\n' +
        '\t\tEXCEPT\n' +
        '\t\tSELECT [service_id] FROM calendar_dates\n' +
        '\t\tWHERE [date] = @nextDayDate AND [exception_type] = 2\n' +
        '\t)\n' +
        'AND [st].[departure_timestamp] <= @currentTimestampPlusOneHour\n' +
        'AND [st].[pickup_type] = 0\n' +
        'ORDER BY [st].[departure_timestamp]',
    sundayNight: 'SELECT [t].[trip_id]\n' +
        '    , [t].[trip_index]\n' +
        '    , [t].[trip_headsign]\n' +
        '    , [t].[route_id]\n' +
        '    , [st].[stop_id]\n' +
        '    , [st].[stop_headsign]\n' +
        '    , [t].[service_id]\n' +
        '    , [t].[direction_id]\n' +
        '    , [st].[arrival_time]\n' +
        '    , [st].[arrival_timestamp]\n' +
        '    , [st].[departure_time]\n' +
        '    , [st].[departure_timestamp]\n' +
        '    , [st].[stop_sequence]\n' +
        '    , [t].[shape_id]\n' +
        '    , [st].[shape_dist_traveled]\n' +
        'FROM trips t, stop_times st\n' +
        'WHERE st.stop_id = @stopId\n' +
        'AND st.trip_id = t.trip_id\n' +
        'AND t.service_id IN (\n' +
        '\tSELECT [service_id]\n' +
        '\t\tFROM calendar\n' +
        '\t\tWHERE [start_date] <= @currentDate\n' +
        '\t\tAND [end_date] >= @currentDate\n' +
        '\t\tAND sunday = 1\n' +
        '\t\tUNION\n' +
        '\t\tSELECT [service_id] FROM calendar_dates\n' +
        '\t\tWHERE [date] = @currentDate AND [exception_type] = 1\n' +
        '\t\tEXCEPT\n' +
        '\t\tSELECT [service_id] FROM calendar_dates\n' +
        '\t\tWHERE [date] = @currentDate AND [exception_type] = 2\n' +
        '\t)\n' +
        'AND [st].[departure_timestamp] >= @wrappedCurrentTimestamp\n' +
        'AND [st].[departure_timestamp] <= @wrappedCurrentTimestampPlusOneHour\n' +
        'AND [st].[pickup_type] = 0\n' +
        '\n' +
        'UNION\n' +
        '\n' +
        'SELECT [t].[trip_id]\n' +
        '    , [t].[trip_index]\n' +
        '    , [t].[trip_headsign]\n' +
        '    , [t].[route_id]\n' +
        '    , [st].[stop_id]\n' +
        '    , [st].[stop_headsign]\n' +
        '    , [t].[service_id]\n' +
        '    , [t].[direction_id]\n' +
        '    , [st].[arrival_time]\n' +
        '    , [st].[arrival_timestamp]\n' +
        '    , [st].[departure_time]\n' +
        '    , [st].[departure_timestamp]\n' +
        '    , [st].[stop_sequence]\n' +
        '    , [t].[shape_id]\n' +
        '    , [st].[shape_dist_traveled]\n' +
        '\t, [c].[date]\n' +
        'FROM trips t, stop_times st\n' +
        'WHERE st.stop_id = @stopId\n' +
        'AND st.trip_id = t.trip_id\n' +
        'AND t.service_id IN (\n' +
        '\tSELECT [service_id]\n' +
        '\t\tFROM calendar\n' +
        '\t\tWHERE [start_date] <= @nextDayDate\n' +
        '\t\tAND [end_date] >= @nextDayDate\n' +
        '\t\tAND monday = 1\n' +
        '\t\tUNION\n' +
        '\t\tSELECT [service_id] FROM calendar_dates\n' +
        '\t\tWHERE [date] = @nextDayDate AND [exception_type] = 1\n' +
        '\t\tEXCEPT\n' +
        '\t\tSELECT [service_id] FROM calendar_dates\n' +
        '\t\tWHERE [date] = @nextDayDate AND [exception_type] = 2\n' +
        '\t)\n' +
        'AND [st].[departure_timestamp] <= @currentTimestampPlusOneHour\n' +
        'AND [st].[pickup_type] = 0\n' +
        'ORDER BY [st].[departure_timestamp]',
    thursdayNight: 'SELECT [t].[trip_id]\n' +
        '    , [t].[trip_index]\n' +
        '    , [t].[trip_headsign]\n' +
        '    , [t].[route_id]\n' +
        '    , [st].[stop_id]\n' +
        '    , [st].[stop_headsign]\n' +
        '    , [t].[service_id]\n' +
        '    , [t].[direction_id]\n' +
        '    , [st].[arrival_time]\n' +
        '    , [st].[arrival_timestamp]\n' +
        '    , [st].[departure_time]\n' +
        '    , [st].[departure_timestamp]\n' +
        '    , [st].[stop_sequence]\n' +
        '    , [t].[shape_id]\n' +
        '    , [st].[shape_dist_traveled]\n' +
        'FROM trips t, stop_times st\n' +
        'WHERE st.stop_id = @stopId\n' +
        'AND st.trip_id = t.trip_id\n' +
        'AND t.service_id IN (\n' +
        '\tSELECT [service_id]\n' +
        '\t\tFROM calendar\n' +
        '\t\tWHERE [start_date] <= @currentDate\n' +
        '\t\tAND [end_date] >= @currentDate\n' +
        '\t\tAND thursday = 1\n' +
        '\t\tUNION\n' +
        '\t\tSELECT [service_id] FROM calendar_dates\n' +
        '\t\tWHERE [date] = @currentDate AND [exception_type] = 1\n' +
        '\t\tEXCEPT\n' +
        '\t\tSELECT [service_id] FROM calendar_dates\n' +
        '\t\tWHERE [date] = @currentDate AND [exception_type] = 2\n' +
        '\t)\n' +
        'AND [st].[departure_timestamp] >= @wrappedCurrentTimestamp\n' +
        'AND [st].[departure_timestamp] <= @wrappedCurrentTimestampPlusOneHour\n' +
        'AND [st].[pickup_type] = 0\n' +
        '\n' +
        'UNION\n' +
        '\n' +
        'SELECT [t].[trip_id]\n' +
        '    , [t].[trip_index]\n' +
        '    , [t].[trip_headsign]\n' +
        '    , [t].[route_id]\n' +
        '    , [st].[stop_id]\n' +
        '    , [st].[stop_headsign]\n' +
        '    , [t].[service_id]\n' +
        '    , [t].[direction_id]\n' +
        '    , [st].[arrival_time]\n' +
        '    , [st].[arrival_timestamp]\n' +
        '    , [st].[departure_time]\n' +
        '    , [st].[departure_timestamp]\n' +
        '    , [st].[stop_sequence]\n' +
        '    , [t].[shape_id]\n' +
        '    , [st].[shape_dist_traveled]\n' +
        'FROM trips t, stop_times st\n' +
        'WHERE st.stop_id = @stopId\n' +
        'AND st.trip_id = t.trip_id\n' +
        'AND t.service_id IN (\n' +
        '\tSELECT [service_id]\n' +
        '\t\tFROM calendar\n' +
        '\t\tWHERE [start_date] <= @nextDayDate\n' +
        '\t\tAND [end_date] >= @nextDayDate\n' +
        '\t\tAND friday = 1\n' +
        '\t\tUNION\n' +
        '\t\tSELECT [service_id] FROM calendar_dates\n' +
        '\t\tWHERE [date] = @nextDayDate AND [exception_type] = 1\n' +
        '\t\tEXCEPT\n' +
        '\t\tSELECT [service_id] FROM calendar_dates\n' +
        '\t\tWHERE [date] = @nextDayDate AND [exception_type] = 2\n' +
        '\t)\n' +
        'AND [st].[departure_timestamp] <= @currentTimestampPlusOneHour\n' +
        'AND [st].[pickup_type] = 0\n' +
        'ORDER BY [st].[departure_timestamp]',
    tuesdayNight: 'SELECT [t].[trip_id]\n' +
        '    , [t].[trip_index]\n' +
        '    , [t].[trip_headsign]\n' +
        '    , [t].[route_id]\n' +
        '    , [st].[stop_id]\n' +
        '    , [st].[stop_headsign]\n' +
        '    , [t].[service_id]\n' +
        '    , [t].[direction_id]\n' +
        '    , [st].[arrival_time]\n' +
        '    , [st].[arrival_timestamp]\n' +
        '    , [st].[departure_time]\n' +
        '    , [st].[departure_timestamp]\n' +
        '    , [st].[stop_sequence]\n' +
        '    , [t].[shape_id]\n' +
        '    , [st].[shape_dist_traveled]\n' +
        'FROM trips t, stop_times st\n' +
        'WHERE st.stop_id = @stopId\n' +
        'AND st.trip_id = t.trip_id\n' +
        'AND t.service_id IN (\n' +
        '\tSELECT [service_id]\n' +
        '\t\tFROM calendar\n' +
        '\t\tWHERE [start_date] <= @currentDate\n' +
        '\t\tAND [end_date] >= @currentDate\n' +
        '\t\tAND tuesday = 1\n' +
        '\t\tUNION\n' +
        '\t\tSELECT [service_id] FROM calendar_dates\n' +
        '\t\tWHERE [date] = @currentDate AND [exception_type] = 1\n' +
        '\t\tEXCEPT\n' +
        '\t\tSELECT [service_id] FROM calendar_dates\n' +
        '\t\tWHERE [date] = @currentDate AND [exception_type] = 2\n' +
        '\t)\n' +
        'AND [st].[departure_timestamp] >= @wrappedCurrentTimestamp\n' +
        'AND [st].[departure_timestamp] <= @wrappedCurrentTimestampPlusOneHour\n' +
        'AND [st].[pickup_type] = 0\n' +
        '\n' +
        'UNION\n' +
        '\n' +
        'SELECT [t].[trip_id]\n' +
        '    , [t].[trip_index]\n' +
        '    , [t].[trip_headsign]\n' +
        '    , [t].[route_id]\n' +
        '    , [st].[stop_id]\n' +
        '    , [st].[stop_headsign]\n' +
        '    , [t].[service_id]\n' +
        '    , [t].[direction_id]\n' +
        '    , [st].[arrival_time]\n' +
        '    , [st].[arrival_timestamp]\n' +
        '    , [st].[departure_time]\n' +
        '    , [st].[departure_timestamp]\n' +
        '    , [st].[stop_sequence]\n' +
        '    , [t].[shape_id]\n' +
        '    , [st].[shape_dist_traveled]\n' +
        'FROM trips t, stop_times st\n' +
        'WHERE st.stop_id = @stopId\n' +
        'AND st.trip_id = t.trip_id\n' +
        'AND t.service_id IN (\n' +
        '\tSELECT [service_id]\n' +
        '\t\tFROM calendar\n' +
        '\t\tWHERE [start_date] <= @nextDayDate\n' +
        '\t\tAND [end_date] >= @nextDayDate\n' +
        '\t\tAND wednesday = 1\n' +
        '\t\tUNION\n' +
        '\t\tSELECT [service_id] FROM calendar_dates\n' +
        '\t\tWHERE [date] = @nextDayDate AND [exception_type] = 1\n' +
        '\t\tEXCEPT\n' +
        '\t\tSELECT [service_id] FROM calendar_dates\n' +
        '\t\tWHERE [date] = @nextDayDate AND [exception_type] = 2\n' +
        '\t)\n' +
        'AND [st].[departure_timestamp] <= @currentTimestampPlusOneHour\n' +
        'AND [st].[pickup_type] = 0\n' +
        'ORDER BY [st].[departure_timestamp]',
    wednesdayNight: 'SELECT [t].[trip_id]\n' +
        '    , [t].[trip_index]\n' +
        '    , [t].[trip_headsign]\n' +
        '    , [t].[route_id]\n' +
        '    , [st].[stop_id]\n' +
        '    , [st].[stop_headsign]\n' +
        '    , [t].[service_id]\n' +
        '    , [t].[direction_id]\n' +
        '    , [st].[arrival_time]\n' +
        '    , [st].[arrival_timestamp]\n' +
        '    , [st].[departure_time]\n' +
        '    , [st].[departure_timestamp]\n' +
        '    , [st].[stop_sequence]\n' +
        '    , [t].[shape_id]\n' +
        '    , [st].[shape_dist_traveled]\n' +
        'FROM trips t, stop_times st\n' +
        'WHERE st.stop_id = @stopId\n' +
        'AND st.trip_id = t.trip_id\n' +
        'AND t.service_id IN (\n' +
        '\tSELECT [service_id]\n' +
        '\t\tFROM calendar\n' +
        '\t\tWHERE [start_date] <= @currentDate\n' +
        '\t\tAND [end_date] >= @currentDate\n' +
        '\t\tAND wednesday = 1\n' +
        '\t\tUNION\n' +
        '\t\tSELECT [service_id] FROM calendar_dates\n' +
        '\t\tWHERE [date] = @currentDate AND [exception_type] = 1\n' +
        '\t\tEXCEPT\n' +
        '\t\tSELECT [service_id] FROM calendar_dates\n' +
        '\t\tWHERE [date] = @currentDate AND [exception_type] = 2\n' +
        '\t)\n' +
        'AND [st].[departure_timestamp] >= @wrappedCurrentTimestamp\n' +
        'AND [st].[departure_timestamp] <= @wrappedCurrentTimestampPlusOneHour\n' +
        'AND [st].[pickup_type] = 0\n' +
        '\n' +
        'UNION\n' +
        '\n' +
        'SELECT [t].[trip_id]\n' +
        '    , [t].[trip_index]\n' +
        '    , [t].[trip_headsign]\n' +
        '    , [t].[route_id]\n' +
        '    , [st].[stop_id]\n' +
        '    , [st].[stop_headsign]\n' +
        '    , [t].[service_id]\n' +
        '    , [t].[direction_id]\n' +
        '    , [st].[arrival_time]\n' +
        '    , [st].[arrival_timestamp]\n' +
        '    , [st].[departure_time]\n' +
        '    , [st].[departure_timestamp]\n' +
        '    , [st].[stop_sequence]\n' +
        '    , [t].[shape_id]\n' +
        '    , [st].[shape_dist_traveled]\n' +
        'FROM trips t, stop_times st\n' +
        'WHERE st.stop_id = @stopId\n' +
        'AND st.trip_id = t.trip_id\n' +
        'AND t.service_id IN (\n' +
        '\tSELECT [service_id]\n' +
        '\t\tFROM calendar\n' +
        '\t\tWHERE [start_date] <= @nextDayDate\n' +
        '\t\tAND [end_date] >= @nextDayDate\n' +
        '\t\tAND thursday = 1\n' +
        '\t\tUNION\n' +
        '\t\tSELECT [service_id] FROM calendar_dates\n' +
        '\t\tWHERE [date] = @nextDayDate AND [exception_type] = 1\n' +
        '\t\tEXCEPT\n' +
        '\t\tSELECT [service_id] FROM calendar_dates\n' +
        '\t\tWHERE [date] = @nextDayDate AND [exception_type] = 2\n' +
        '\t)\n' +
        'AND [st].[departure_timestamp] <= @currentTimestampPlusOneHour\n' +
        'AND [st].[pickup_type] = 0\n' +
        'ORDER BY [st].[departure_timestamp]'
}

module.exports = { loadSqlQueriesResponseMock }