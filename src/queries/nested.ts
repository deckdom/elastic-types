import { IgnoreUnmappedOption } from '../options';
import { SearchQuery } from '../queries';

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
