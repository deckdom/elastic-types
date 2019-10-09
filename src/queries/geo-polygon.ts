import { IgnoreUnmappedOption } from '../options';
import { GeoVertex, ValidationMethodOption } from '../geo';

/**
 * A query returning hits that only fall within a polygon of points.
 * 
 * @see https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-geo-polygon-query.html
 */
export interface GeoPolygonQuery {
    geo_polygon: GeoPolygonQueryOptions & {
        [field: string]: {
            points: GeoVertex[];
        }
    };
}

export interface GeoPolygonQueryOptions extends ValidationMethodOption, IgnoreUnmappedOption { }
