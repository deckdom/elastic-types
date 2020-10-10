/**
 * @see https://www.elastic.co/guide/en/elasticsearch/reference/current/search-search.html#search-api-response-body
 */
export interface SearchResponse<T extends Document> {
    /**
     * The duration of how long the scroll is remaining active.
     */
    scroll?: string;
    /**
     * The id of the scroll to request the next page or to cancel it manually.
     */
    scroll_id?: string;
    /**
     * Object containing a count of shards used for the request.
     */
    _shards: {
        /**
         * Total number of shards that require querying,
         * including unallocated shards.
         */
        total: number;
        /**
         * Number of shards that executed the request successfully.
         */
        successful: number;
        /**
         * Number of shards that skipped the request because a lightweight
         * check helped realize that no documents could possibly match
         * on this shard. This typically happens when a search request includes
         * a range filter and the shard only has values
         * that fall outside of that range.
         */
        skipped: number;
        /**
         * Number of shards that failed to execute the request. Note that
         * shards that are not allocated will be considered
         * neither successful nor failed.
         * Having `failed+successful` less than total is thus an indication
         * that some of the shards were not allocated.
         */
        failed: number;
    };
    /**
     * Milliseconds it took Elasticsearch to execute the request.
     * 
     * This value is calculated by measuring the time elapsed between
     * receipt of a request on the coordinating node and the time at
     * which the coordinating node is ready to send the response.
     * 
     * Took time includes:
     * 
     * * Communication time between the coordinating node and data nodes
     * * Time the request spends in the search thread pool,
     * queued for execution
     * * Actual execution time
     * 
     * Took time does not include:
     * 
     * * Time needed to send the request to Elasticsearch
     * * Time needed to serialize the JSON response
     * * Time needed to send the response to a client
     */
    took: number;
    /**
     * If `true`, the request timed out before completion;
     * returned results may be partial or empty.
     */
    timed_out: boolean;
    /**
     * Contains returned documents and metadata.
     */
    hits: {
        /**
         * Metadata about the number of returned documents.
         */
        total: {
            /**
             * Total number of returned documents.
             */
            value: number;
            /**
             * Indicates whether the number of returned documents in the value
             * parameter is accurate or a lower bound.
             * 
             * * `eq`: Accurate
             * * `gte`: Lower bound, including returned documents
             */
            relation: 'eq' | 'gte';
        };
        /**
         * Highest returned document `_score`.
         * 
         * The `_score` parameter is a 32-bit floating point number used to
         * determine the relevance of the returned document.
         * 
         * This parameter value is `null` for requests
         * that do not sort by `_score`.
         */
        max_score: number;
        /**
         * Array of returned document objects.
         */
        hits: {
            /**
             * Name of the index containing the returned document.
             */
            _index: string;
            /**
             * Document type.
             */
            _type: string;
            /**
             * Unique identifier for the returned document.
             * This ID is only unique within the returned index.
             */
            _id: string;
            /**
             * Positive 32-bit floating point number used to determine
             * the relevance of the returned document.
             */
            _score: number;
            /**
             * Object containing the original JSON body passed for the
             * document at index time.
             */
            _source: Partial<T>;
        }[];
    };
}