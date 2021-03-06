/**
 * This multi-bucket aggregation is similar to the normal histogram,
 * but it can only be used with date or date range values.
 * Because dates are represented internally in Elasticsearch as long values,
 * it is possible, but not as accurate, to use the normal `histogram`
 * on dates as well.
 * The main difference in the two APIs is that here the interval can be
 * specified using date/time expressions.
 * Time-based data requires special support because time-based intervals
 * are not always a fixed length.
 * 
 * @see https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-datehistogram-aggregation.html
 */
export interface DateHistogramAggregation {
    date_histogram: DateHistogramAggregationOptions;
}

export interface DateHistogramAggregationOptions {
    field: string;
    calendar_interval?: string;
    fixed_interval?: string;
    format?: string;
    time_zone?: string;
    offset?: string;
    keyed?: string;
    missing?: string;
}
