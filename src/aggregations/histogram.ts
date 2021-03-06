/**
 * A multi-bucket values source based aggregation that can be applied
 * on numeric values or numeric range values extracted from the documents.
 * It dynamically builds fixed size (a.k.a. interval) buckets
 * over the values.
 * 
 * @see https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-histogram-aggregation.html
 */
export interface HistoramAggregation {
    histogram: HistoramAggregationOptions;
}

export interface HistoramAggregationOptions {
    field: string;
    interval: number;
    hard_bounds?: {
        min?: number;
        max?: number;
    };
    extended_bounds?: {
        min?: number;
        max?: number;
    };
    order?: 'asc' | 'desc';
    offset?: number;
    keyed?: boolean;
    missing?: number | string;
}
