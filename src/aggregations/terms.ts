import { ScriptObject, SortingOption } from '../common';

/**
 * A multi-bucket value source based aggregation where buckets
 * are dynamically built - one per unique value.
 * 
 * @see https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-terms-aggregation.html
 */
export interface TermsAggregation {
    terms: TermsAggregationOptions;
}

export interface TermsAggregationOptions {
    field: string;
    /**
     * The `size` parameter can be set to define how many term buckets should
     * be returned out of the overall terms list. By default, the node
     * coordinating the search process will request each shard to provide its
     * own top `size` term buckets and once all shards respond, it will reduce
     * the results to the final list that will then be returned to the client.
     * This means that if the number of unique terms is greater than `size`,
     * the returned list is slightly off and not accurate (it could be that the
     * term counts are slightly off and it could even be that a term that
     * should have been in the top size buckets was not returned).
     */
    size?: number;
    /**
     * The higher the requested `size` is, the more accurate the results will
     * be, but also, the more expensive it will be to compute the final results
     * (both due to bigger priority queues that are managed on a shard level
     * and due to bigger data transfers between the nodes and the client).
     * 
     * The `shard_size` parameter can be used to minimize the extra work that
     * comes with bigger requested `size`. When defined, it will determine how
     * many terms the coordinating node will request from each shard. Once
     * all the shards responded, the coordinating node will then reduce them
     * to a final result which will be based on the `size` parameter - this
     * way, one can increase the accuracy of the returned terms and avoid
     * the overhead of streaming a big list of buckets back to the client.
     * 
     * > `shard_size` cannot be smaller than `size` (as it doesn’t make much
     * > sense). When it is, Elasticsearch will override it and reset it
     * > to be equal to size.
     * 
     * The default `shard_size` is (size * 1.5 + 10).
     */
    shard_size?: number;
    /**
     * This shows an error value for each term returned by the aggregation
     * which represents the worst case error in the document count and can be
     * useful when deciding on a value for the `shard_size` parameter. This is
     * calculated by summing the document counts for the last term returned
     * by all shards which did not return the term.
     */
    show_term_doc_count_error?: boolean;
    /**
     * The order of the buckets can be customized by setting the order
     * parameter. By default, the buckets are ordered by their `doc_count`
     * descending.
     */
    order?: SortingOption | SortingOption[];
    min_doc_count?: number;
    script?: ScriptObject;
    include?: string | number | (string | number)[];
    exclude?: string | number | (string | number)[];
    collect_mode?: 'breadth_first' | 'depth_first';
    execution_hint?: 'map' | 'global_ordinals';
    missing?: string | number;
}