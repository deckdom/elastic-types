import { IgnoreUnmappedOption } from '../common';
import { SearchQuery } from './search-query';

export type JoiningQuery = NestedQuery
    | HasChildQuery;

export interface NestedQueryOptions extends IgnoreUnmappedOption {
    /** Path to the nested object you wish to search. */
    path: string;
    /**
     * Query you wish to run on nested objects in the `path`.
     * If an object matches the search, the `nested` query returns the root parent document.
     * 
     * You can search nested fields using dot notation
     * that includes the complete path, such as `obj1.name`.
     * 
     * Multi-level nesting is automatically supported, and detected,
     * resulting in an inner nested query to automatically match the relevant nesting level,
     * rather than root, if it exists within another nested query.
     */
    query: SearchQuery;
    /**
     * Indicates how scores for matching child objects
     * affect the root parent document’s relevance score.
     * Valid values are:
     * 
     * * `avg` (Default): Use the mean relevance score of all matching child objects.
     * * `max`: Uses the highest relevance score of all matching child objects.
     * * `min`: Uses the lowest relevance score of all matching child objects.
     * * `none`: Do not use the relevance scores of matching child objects.
     *   The query assigns parent documents a score of 0.
     * * `sum`: Add together the relevance scores of all matching child objects.
     */
    score_mode?: 'avg' | 'max' | 'min' | 'none' | 'sum';
}

/**
 * Wraps another query to search nested fields.
 * 
 * The nested query searches nested field objects as if they were
 * indexed as separate documents.
 * If an object matches the search,
 * the nested query returns the root parent document.
 * 
 * @see https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-nested-query.html
 */
export interface NestedQuery {
    nested: NestedQueryOptions;
}

export interface HasChildQueryOptions extends IgnoreUnmappedOption {
    /** Name of the child relationship mapped for the join field. */
    type: string;
    /**
     * Query you wish to run on child documents of the `type` field.
     * If a child document matches the search, the query returns the parent document.
     */
    query: SearchQuery;
    /**
     * Maximum number of child documents that match the `query` allowed for a returned parent document.
     * If the parent document exceeds this limit, it is excluded from the search results.
     */
    max_children?: number;
    /**
     * Minimum number of child documents that match the `query`
     * required to match the query for a returned parent document.
     * If the parent document does not meet this limit, it is excluded from the search results.
     */
    min_children?: number;
    /**
     * Indicates how scores for matching child objects
     * affect the root parent document’s relevance score.
     * Valid values are:
     * 
     * * `avg`: Use the mean relevance score of all matching child objects.
     * * `max`: Uses the highest relevance score of all matching child objects.
     * * `min`: Uses the lowest relevance score of all matching child objects.
     * * `none` (Default): Do not use the relevance scores of matching child objects.
     *   The query assigns parent documents a score of 0.
     * * `sum`: Add together the relevance scores of all matching child objects.
     */
    score_mode?: 'avg' | 'max' | 'min' | 'none' | 'sum';
}

/**
 * Returns parent documents whose joined child documents match a provided query.
 * You can create parent-child relationships between documents
 * in the same index using a join field mapping.
 * 
 * @see https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-has-child-query.html
 */
export interface HasChildQuery {
    has_child: HasChildQueryOptions;
}