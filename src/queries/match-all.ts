import { BoostOption } from './options';

/**
 * The most simple query, which matches all documents, giving them all a `_score` of `1.0`.
 * The _score can be changed with the `boost` parameter.
 * 
 * @see https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-match-all-query.html
 */
export interface MatchAllQuery {
    match_all: MatchAllQueryOptions;
}

export interface MatchAllQueryOptions extends BoostOption {}
