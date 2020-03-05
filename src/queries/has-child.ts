import { IgnoreUnmappedOption } from './options';
import { SearchQuery } from '../queries';

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
