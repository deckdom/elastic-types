import { GeoVertex } from '../common';

/**
 * A multi-bucket aggregation that groups `geo_point` and `geo_shape` values
 * into buckets that represent a grid. The resulting grid can be sparse and
 * only contains cells that have matching data. Each cell is labeled using
 * a geohash which is of user-definable precision.
 * 
 * * High precision geohashes have a long string length and represent cells
 *   that cover only a small area.
 * * Low precision geohashes have a short string length and represent cells
 *   that each cover a large area.
 * 
 * Geohashes used in this aggregation can have a choice of precision
 * between 1 and 12.
 * 
 * > The highest-precision geohash of length 12 produces cells that cover less
 * > than a square metre of land and so high-precision requests can be very
 * > costly in terms of RAM and result sizes. Please see the example below on
 * > how to first filter the aggregation to a smaller geographic area before
 * > requesting high-levels of detail.
 * 
 * You can only use `geohash_grid` to aggregate an explicitly mapped
 * `geo_point` or geo_shape field. If the `geo_point` field contains an array,
 * `geohash_grid` aggregates all the array values.
 * 
 * @see https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-geohashgrid-aggregation.html
 */
export interface GeoHashGridAggregation {
    geohash_grid: GeoHashGridAggregationOptions;
}

export interface GeoHashGridAggregationOptions {
    field: string;
    precision?: number;
    bounds?: GeoVertex;
}