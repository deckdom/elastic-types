import { SearchQuery } from '../queries';

/**
 * A bucket aggregation returning a form of adjacency matrix.
 * The request provides a collection of named filter expressions,
 * similar to the `filters` aggregation request.
 * Each bucket in the response represents a non-empty cell
 * in the matrix of intersecting filters.
 * 
 * @see https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-adjacency-matrix-aggregation.html
 */
export interface AdjacencyMatrixAggregation {
    adjacency_matrix: AdjacencyMatrixAggregationOptions;
}

export interface AdjacencyMatrixAggregationOptions {
    filters: {
        [key: string]: SearchQuery;
    }
}