/**
 * A special single bucket aggregation that selects child documents
 * that have the specified type, as defined in a `join` field.
 * 
 * @see https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-children-aggregation.html
 */
export interface ChildrenAggregation {
    children: ChildrenAggregationOptions;
}

export interface ChildrenAggregationOptions {
    /**
     * The child type that should be selected. 
     */
    type: string;
}