/**
 * Defines a single bucket of all the documents within the search
 * execution context. This context is defined by the indices and the document
 * types you’re searching on, but is not influenced by the search query itself.
 * 
 * > Global aggregators can only be placed as top level aggregators because it
 * > doesn’t make sense to embed a global aggregator within another
 * bucket aggregator.
 * 
 * @see https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-global-aggregation.html
 */
export interface GlobalAggregation {
    global: {};
}
