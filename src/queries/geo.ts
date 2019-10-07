import { IgnoreUnmappedOption } from '../common';

export type GeoQuery = GeoBoundingBoxQuery
    | GeoDistanceQuery
    | GeoPolygonQueryOptions
    | GeoShapeQueryOptions;

type GeoPosition = string | [number, number] | {
    lat: number;
    lon: number;
};

type GeoShapeType = 'point'
    | 'linestring'
    | 'polygon'
    | 'multipoint'
    | 'multilinestring'
    | 'multipolyon'
    | 'geometrycollection'
    | 'envelope'
    | 'circle';

interface GeoVertex {
    top_left?: GeoPosition;
    topLeft?: GeoPosition;
    bottom_right?: GeoPosition;
    bottomRight?: GeoPosition;
    top_right?: GeoPosition;
    topRight?: GeoPosition;
    bottom_left?: GeoPosition;
    bottomLeft?: GeoPosition;
    wkt?: string;
    top?: number;
    left?: number;
    bottom?: number;
    right?: number;
}

interface ValidationMethodOption {
    /**
     * Set to `IGNORE_MALFORMED` to accept geo points with invalid latitude or longitude,
     * set to `COERCE` to also try to infer correct latitude or longitude.
     * Default is `STRICT`.
     */
    validation_method?: 'IGNORE_MALFORMED' | 'COERCE' |'STRICT';
}

export interface GeoBoundingBoxQueryOptions extends ValidationMethodOption, IgnoreUnmappedOption {
    /**
     * Set to one of `indexed` or `memory` to defines whether this filter
     * will be executed in memory or indexed.
     * Default is `memory`.
     */
    type?: 'memory' | 'indexed';
}

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

export interface GeoPolygonQueryOptions extends ValidationMethodOption, IgnoreUnmappedOption {}

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

export interface GeoShapeQueryOptions extends IgnoreUnmappedOption {
    shape?: {
        type?: GeoShapeType;
        coordinates: GeoVertex[];
    };
    indexed_shape?: {
        /** The ID of the document that containing the pre-indexed shape. */
        id: string;
        /** Name of the index where the pre-indexed shape is. Defaults to `shapes`. */
        index?: string;
        /** The field specified as path containing the pre-indexed shape. Defaults to `shape`. */
        path?: string;
        /** The routing of the shape document if required. */
        routing?: string;
    };
    /**
     * The geo_shape strategy mapping parameter determines
     * which spatial relation operators may be used at search time.
     * 
     * The following is a complete list of spatial relation operators available:
     * 
     * * `INTERSECTS` - (default) Return all documents whose geo_shape field intersects the query geometry.
     * * `DISJOINT` - Return all documents whose geo_shape field has nothing in common with the query geometry.
     * * `WITHIN` - Return all documents whose geo_shape field is within the query geometry.
     * * `CONTAINS` - Return all documents whose geo_shape field contains the query geometry.
     *   Note: this is only supported using the recursive Prefix Tree Strategy.
     */
    relation?: 'INTERSECTS' | 'DISJOINT' | 'WITHIN' | 'CONTAINS';
}

/**
 * 
 * The `geo_shape` query uses the same grid square representation as the `geo_shape` mapping
 * to find documents that have a shape that intersects with the query shape.
 * It will also use the same Prefix Tree configuration as defined for the field mapping.
 * 
 * The query supports two ways of defining the query shape, either by providing a whole shape definition,
 * or by referencing the name of a shape pre-indexed in another index.
 * 
 * @see https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-geo-shape-query.html
 */
export interface GeoShapeQuery {
    geo_shape: {
        [field: string]: GeoShapeQueryOptions;
    };
}
