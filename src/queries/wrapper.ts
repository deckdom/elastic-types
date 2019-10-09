/**
 * A query that accepts any other query as base64 encoded string.
 * 
 * @see https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-wrapper-query.html
 */
export interface WrapperQuery {
    wrapper: WrapperQueryOptions;
}

export interface WrapperQueryOptions {
    /** The base64 encoded query. */
    query: string;
}
