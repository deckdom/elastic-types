/**
 * A special single bucket aggregation that enables aggregating
 * nested documents.
 * 
 * @see https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-nested-aggregation.html
 */
export interface NestedAggregation {
    nested: NestedAggregationOptions;
}

export interface NestedAggregationOptions {
    path: string;
}
