import { GeoDistanceType, GeoPosition, GeoRange, GeoUnit } from '../common';

/**
 * A multi-bucket aggregation that works on `geo_point` fields and conceptually
 * works very similar to the range aggregation. The user can define a point of
 * origin and a set of distance range buckets. The aggregation evaluate the
 * distance of each document value from the origin point and determines the
 * buckets it belongs to based on the ranges (a document belongs to a bucket
 * if the distance between the document and the origin falls within the
 * distance range of the bucket).
 * 
 * @see https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-geodistance-aggregation.html
 */
export interface GeoDistanceAggregation {
    geo_distance: GeoDistanceAggregationOptions;
}

export interface GeoDistanceAggregationOptions {
    field: string;
    origin: GeoPosition;
    unit?: GeoUnit;
    distance_type?: GeoDistanceType;
    ranges: GeoRange[];
}
