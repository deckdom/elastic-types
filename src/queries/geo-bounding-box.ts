import { IgnoreUnmappedOption } from './options';
import { GeoVertex, ValidationMethodOption } from '../common/geo';

/**
 * A query allowing to filter hits based on a point location using a bounding box.
 * 
 * @see https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-geo-bounding-box-query.html
 */
export interface GeoBoundingBoxQuery {
    geo_bounding_box: GeoBoundingBoxQueryOptions & {
        /** Optional name field to identify the filter. */
        [field: string]: GeoVertex;
    };
}

export interface GeoBoundingBoxQueryOptions extends ValidationMethodOption, IgnoreUnmappedOption {
    /**
     * Set to one of `indexed` or `memory` to defines whether this filter
     * will be executed in memory or indexed.
     * Default is `memory`.
     */
    type?: 'memory' | 'indexed';
}
