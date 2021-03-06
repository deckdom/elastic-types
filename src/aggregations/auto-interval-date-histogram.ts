/**
 * A multi-bucket aggregation similar to the Date histogram except
 * instead of providing an interval to use as the width of each bucket,
 * a target number of buckets is provided indicating the number
 * of buckets needed and the interval of the buckets is automatically chosen
 * to best achieve that target.
 * The number of buckets returned will always be less than
 * or equal to this target number.
 * 
 * @see https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-autodatehistogram-aggregation.html
 */
export interface AutoIntervalDateHistogramAggregation {
    auto_date_histogram: AutoIntervalDateHistogramAggregationOptions;
}

export interface AutoIntervalDateHistogramAggregationOptions {
    field: string;
    /**
     * Amount of buckets to return.
     * Defaults to `10`.
     */
    buckets?: number;
    /**
     * Internally, a date is represented as a 64 bit number representing
     * a timestamp in milliseconds-since-the-epoch.
     * These timestamps are returned as the bucket keys.
     * 
     * If no `format` is specified, then it will use the first date format
     * specified in the field mapping.
     * 
     * @see https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping-date-format.html
     */
    format?: string;
    /**
     * The interval of the returned buckets is selected based on the data
     * collected by the aggregation so that the number of buckets returned
     * is less than or equal to the number requested.
     * 
     * The possible intervals returned are:
     * 
     * | Interval | Code | Description                              |
     * | -------- | ---- | ---------------------------------------- |
     * | Seconds  | `s`  | In multiples of 1, 5, 10 and 30          |
     * | Minutes  | `m`  | In multiples of 1, 5, 10 and 30          |
     * | Hours    | `h`  | In multiples of 1, 3 and 12              |
     * | Days     | `d`  | In multiples of 1, and 7                 |
     * | Months   | `M`  | In multiples of 1, and 3                 |
     * | Years    | `y`  | In multiples of 1, 5, 10, 20, 50 and 100 |
     * 
     * In the worst case, where the number of daily buckets are too many
     * for the requested number of buckets, the number of buckets returned
     * will be 1/7th of the number of buckets requested.
     */
    interval?: string;
    /**
     * The minimum_interval allows the caller to specify the minimum rounding
     * interval that should be used. This can make the collection process
     * more efficient, as the aggregation will not attempt to round at any
     * interval lower than `minimum_interval`.
     * 
     * The accepted units for `minimum_interval` are:
     * * year
     * * month
     * * day
     * * hour
     * * minute
     * * second
     */
    minimum_interval?: string;
    /**
     * The missing parameter defines how documents that are missing a value
     * should be treated.
     * By default they will be ignored but it is also possible
     * to treat them as if they had a value.
     */
    missing?: string;
    /**
     * Date-times are stored in Elasticsearch in UTC.
     * By default, all bucketing and rounding is also done in UTC.
     * The `time_zone` parameter can be used to indicate that bucketing
     * should use a different time zone.
     * 
     * Time zones may either be specified as an ISO 8601 UTC
     * offset (e.g. `+01:00` or -`08:00`) or as a timezone id,
     * an identifier used in the TZ database like `America/Los_Angeles`.
     */
    time_zone?: string;
}