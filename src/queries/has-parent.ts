import { IgnoreUnmappedOption } from '../options';
import { SearchQuery } from '../queries';

/**
 * Returns child documents whose joined parent document matches a provided query.
 * You can create parent-child relationships between documents
 * in the same index using a join field mapping.
 * 
 * @see https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-has-parent-query.html
 */
export interface HasParentQuery {
    has_parent: HasParentQueryOptions;
}

export interface HasParentQueryOptions extends IgnoreUnmappedOption {
    /** Name of the parent relationship mapped for the join field. */
    parent_type: string;
    /**
     * Query you wish to run on parent documents of the `parent_type` field.
     * If a parent document matches the search, the query returns its child documents.
     */
    query: SearchQuery;
    /**
     *  Indicates whether the relevance score of a matching parent document
     * is aggregated into its child documents. Defaults to `false`.
     * 
     * If `false`, Elasticsearch ignores the relevance score of the parent document.
     * Elasticsearch also assigns each child document a relevance score equal
     * to the `query`'s boost, which defaults to `1`.
     * 
     * If `true`, the relevance score of the matching parent document
     * is aggregated into its child documents' relevance scores.
     * 
     * @see https://www.elastic.co/guide/en/elasticsearch/reference/current/query-filter-context.html
     */
    score?: boolean;
}
