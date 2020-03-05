import { IgnoreUnmappedOption } from './options';

/**
 * Returns child documents joined to a specific parent document.
 * You can use a join field mapping to create
 * parent-child relationships between documents in the same index.
 * 
 * @see https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-parent-id-query.html
 */
export interface ParentIDQuery {
    parent_id: ParentIDQueryOptions;
}

export interface ParentIDQueryOptions extends IgnoreUnmappedOption {
    /** Name of the child relationship mapped for the join field. */
    type: string;
    /** ID of the parent document. The query will return child documents of this parent document. */
    id: string;
}
