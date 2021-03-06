import { DateHistogramAggregation } from './date-histogram';
import { GeoTileGridAggregation } from './geotile-grid';
import { HistoramAggregation } from './histogram';
import { TermsAggregation } from './terms';

/**
 * A `multi-bucket` aggregation that creates `composite` buckets
 * from different sources.
 * 
 * Unlike the other multi-bucket aggregations, you can use the
 * composite aggregation to paginate all buckets from a multi-level
 * aggregation efficiently. This aggregation provides a way to stream
 * all buckets of a specific aggregation,
 * similar to what scroll does for documents.
 * 
 * The composite buckets are built from the combinations of the values
 * extracted/created for each document and each combination
 * is considered as a composite bucket.
 * 
 * @see https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-composite-aggregation.html
 */
export interface CompositeAggregation {
    composite: CompositeAggregationOptions;
}

export interface CompositeAggregationOptions {
    sources: {
        [name: string]:
        | TermsAggregation
        | HistoramAggregation
        | DateHistogramAggregation
        | GeoTileGridAggregation
        ;
    }[];
}