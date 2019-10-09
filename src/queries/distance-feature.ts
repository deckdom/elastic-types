import { BoostOption } from '../options';

/**
 * Boosts the relevance score of documents closer to a provided `origin` date or point.
 * For example, you can use this query to give more weight
 * to documents closer to a certain date or location.
 * 
 * You can use the `distance_feature` query to find the nearest neighbors to a location.
 * You can also use the query in a `bool` search’s `should` filter to add
 * boosted relevance scores to the bool query’s scores.
 * 
 * @see https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-distance-feature-query.html
 */
export interface DistanceFeatureQuery {
    distance_feature: DistanceFeatureQueryOptions;
}

export interface DistanceFeatureQueryOptions extends BoostOption {
    /**
     * Name of the field used to calculate distances. This field must meet the following criteria:
     * * Be a `date`, `date_nanos` or `geo_point` field
     * * Have an `index` mapping parameter value of `true`, which is the default
     * * Have an `doc_values` mapping parameter value of `true`, which is the default
     */
    field: string;
    /**
     * Date or point of origin used to calculate distances.
     * 
     * If the `field` value is a `date` or `date_nanos` field,
     * the origin value must be a date.
     * Date Math, such as now-1h, is supported.
     * 
     * If the field value is a `geo_point` field, the `origin` value must be a geopoint.
     */
    origin: string;
    /**
     * Distance from the origin at which relevance scores receive half of the `boost` value.
     * 
     * If the field value is a `date` or `date_nanos` field,
     * the pivot value must be a time unit, such as `1h` or `10d`.
     * 
     * If the field value is a `geo_point` field,
     * the pivot value must be a distance unit, such as `1km` or `12m`.
     */
    pivot: string;
}
