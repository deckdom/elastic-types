/**
 * Returns documents based on their IDs. This query uses document IDs stored in the `_id` field.
 * 
 * @see https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-ids-query.html
 */
export interface IDsQuery {
    ids: IDsQueryOptions;
}

export interface IDsQueryOptions {
    /** An array of document IDs. */
    values: string[];
}
