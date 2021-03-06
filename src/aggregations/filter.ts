import { SearchQuery } from '../queries';

/**
 * Defines a single bucket of all the documents in the current document
 * set context that match a specified filter.
 * Often this will be used to narrow down the current aggregation context
 * to a specific set of documents.
 * 
 * @see https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-filter-aggregation.html
 */
export interface FilterAggregation {
    filter: SearchQuery;
}
