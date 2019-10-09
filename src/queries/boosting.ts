import { SearchQuery } from '../queries';

/**
 * Returns documents matching a positive query while reducing the relevance score
 * of documents that also match a negative query.
 * 
 * You can use the boosting query to demote certain documents
 * without excluding them from the search results.
 * 
 * @see https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-boosting-query.html
 */
export interface BoostingQuery {
    boosting: BoostingQueryOptions;
}

export interface BoostingQueryOptions {
    /** Query you wish to run. Any returned documents must match this query. */
    positive: SearchQuery;
    /**
     * Query used to decrease the relevance score of matching documents.
     * 
     * If a returned document matches the `positive` query and this query,
     * the `boosting` query calculates the final relevance score for the document as follows:
     * 
     * * Take the original relevance score from the`positive` query.
     * * Multiply the score by the `negative_boost` value.
     */
    negative: SearchQuery;
    /**
     * Floating point number between `0` and `1.0` used to
     * decrease the relevance scores of documents matching the `negative` query.
     */
    negative_boost?: number;
}
