import { SearchQuery } from './search-query';
import { MinimumShouldMatchOption, BoostOption } from '../common';

export type CompoundQuery = BooleanQuery
    | BoostingQuery
    | ConstantScoreQuery
    | DisjunctionMaxQuery;

export interface BooleanQueryOptions extends MinimumShouldMatchOption, BoostOption {
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

/**
 * A query that matches documents matching boolean combinations of other queries.
 * The bool query maps to Lucene `BooleanQuery`.
 * It is built using one or more boolean clauses, each clause with a typed occurrence.
 * 
 * @see https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-bool-query.html
 */
export interface BooleanQuery {
    bool: BooleanQueryOptions;
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

export interface ConstantScoreQueryOptions extends BoostOption {
    filter: SearchQuery;
}

/**
 * Wraps a `filter` query and returns every matching document
 * with a relevance score equal to the `boost` parameter value.
 * 
 * @see https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-constant-score-query.html
 */
export interface ConstantScoreQuery {
    constant_score: ConstantScoreQueryOptions;
}

export interface DisjunctionMaxQueryOptions {
    /**
     * Contains one or more query clauses.
     * Returned documents **must match one or more** of these queries.
     * If a document matches multiple queries,
     * Elasticsearch uses the highest relevance score.
     */
    queries: SearchQuery[];
    /**
     * Floating point number between `0` and `1.0` used to increase
     * the relevance scores of documents matching multiple query clauses.
     * Defaults to `0.0`.
     * 
     * You can use the `tie_breaker` value to assign higher relevance scores
     * to documents that contain the same term in multiple fields than documents
     * that contain this term in only the best of those multiple fields,
     * without confusing this with the better case of two different terms in the multiple fields.
     * 
     * If a document matches multiple clauses,
     * the `dis_max` query calculates the relevance score for the document as follows:
     * 
     * 1. Take the relevance score from a matching clause with the highest score.
     * 2. Multiply the score from any other matching clauses by the `tie_breaker` value.
     * 3. Add the highest score to the multiplied scores.
     * 
     * If the `tie_breaker` value is greater than `0.0`,
     * all matching clauses count, but the clause with the highest score counts most.
     */
    tie_breaker?: number;
}

/**
 * Returns documents matching one or more wrapped queries, called query clauses or clauses.
 * 
 * If a returned document matches multiple query clauses, the `dis_max` query assigns the document
 * the highest relevance score from any matching clause,
 * plus a tie breaking increment for any additional matching subqueries.
 * 
 * You can use the `dis_max` to search for a term in fields mapped with different boost factors.
 * 
 * @see https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-dis-max-query.html
 */
export interface DisjunctionMaxQuery {
    dis_max: DisjunctionMaxQueryOptions;
}
