import { SearchQuery } from '../queries';
import { MinimumShouldMatchOption, BoostOption } from '../options';

/**
 * A query that matches documents matching boolean combinations of other queries.
 * The bool query maps to Lucene `BooleanQuery`.
 * It is built using one or more boolean clauses, each clause with a typed occurrence.
 * 
 * @see https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-bool-query.html
 */
export interface BoolQuery {
    bool: BoolQueryOptions;
}

export interface BoolQueryOptions extends MinimumShouldMatchOption, BoostOption {
    /** The clause (query) must appear in matching documents and will contribute to the score. */
    must?: SearchQuery | SearchQuery[];
    /**
     * The clause (query) must not appear in the matching documents.
     * Clauses are executed in filter context meaning that
     * scoring is ignored and clauses are considered for caching.
     * Because scoring is ignored, a score of `0` for all documents is returned.
     */
    must_not?: SearchQuery | SearchQuery[];
    /**
     * The clause (query) must appear in matching documents.
     * However unlike must the score of the query will be ignored.
     * Filter clauses are executed in filter context,
     * meaning that scoring is ignored and clauses are considered for caching.
     */
    filter?: SearchQuery | SearchQuery[];
    /** The clause (query) should appear in the matching document. */
    should?: SearchQuery | SearchQuery[];
}
