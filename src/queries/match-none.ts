/**
 * This is the inverse of the match_all query, which matches no documents.
 * 
 * @see https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-match-all-query.html
 */
export interface MatchNoneQuery {
    match_none: MatchNoneQueryOptions;
}

export interface MatchNoneQueryOptions { }
