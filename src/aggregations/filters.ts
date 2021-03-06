import { SearchQuery } from '../queries';

/**
 * Defines a multi bucket aggregation where each bucket is associated
 * with a filter. Each bucket will collect all documents
 * that match its associated filter.
 * 
 * @see https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-filters-aggregation.html
 */
export interface FiltersAggregation {
    filters: FiltersAggregationOptions;
}

export interface FiltersAggregationOptions {
    [key: string]: SearchQuery;
}
