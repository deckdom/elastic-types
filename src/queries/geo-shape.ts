import { IgnoreUnmappedOption } from './options';
import { GeoShapeType, GeoVertex } from '../common/geo';

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
