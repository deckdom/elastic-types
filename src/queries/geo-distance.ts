import { IgnoreUnmappedOption } from '../options';
import { GeoVertex, ValidationMethodOption } from '../geo';

/**
 * Filters documents that include only hits that exists within a specific distance from a geo point.
 * 
 * @see https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-geo-distance-query.html
 */
export interface GeoDistanceQuery {
    geo_distance: GeoDistanceQuery & {
        [field: string]: GeoVertex;
    };
}

export interface GeoDistanceQueryOptions extends ValidationMethodOption, IgnoreUnmappedOption {
    /**
     * The radius of the circle centred on the specified location.
     * Points which fall into this circle are considered to be matches.
     * The `distance` can be specified in various units.
     * 
     * @see https://www.elastic.co/guide/en/elasticsearch/reference/current/common-options.html#distance-units
     */
    distance: string;
    /**
     * How to compute the distance.
     * Can either be `arc` (default),
     * or `plane` (faster, but inaccurate on long distances and close to the poles).
     */
    distance_type?: 'arc' | 'plane';
}
