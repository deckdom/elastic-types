/**
 * Filters documents matching the provided document / mapping type.
 * 
 * @see https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-type-query.html
 */
export interface TypeQuery {
    type: TypeQueryOptions;
}

export interface TypeQueryOptions {
    value: string;
}
