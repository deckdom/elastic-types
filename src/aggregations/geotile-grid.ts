import { GeoVertex } from '../common';

/**
 * A multi-bucket aggregation that groups `geo_point` and `geo_shape` values
 * into buckets that represent a grid. The resulting grid can be sparse and
 * only contains cells that have matching data. Each cell corresponds to a
 * map tile as used by many online map sites. Each cell is labeled using a
 * "{zoom}/{x}/{y}" format, where zoom is equal to
 * the user-specified precision.
 * 
 * * High precision keys have a larger range for x and y, and represent tiles
 *   that cover only a small area.
 * * Low precision keys have a smaller range for x and y, and represent tiles
 *   that each cover a large area.
 * 
 * See Zoom level documentation on how precision (zoom) correlates to size
 * on the ground. Precision for this aggregation can be
 * between 0 and 29, inclusive.
 * 
 * > The highest-precision geotile of length 29 produces cells that cover less
 * > than a 10cm by 10cm of land and so high-precision requests can be very
 * > costly in terms of RAM and result sizes. Please see the example below on
 * > how to first filter the aggregation to a smaller geographic area before
 * > requesting high-levels of detail.
 * 
 * You can only use `geotile_grid` to aggregate an explicitly mapped
 * `geo_point` or `geo_shape` field. If the `geo_point` field contains
 * an array, `geotile_grid` aggregates all the array values.
 * 
 * @see https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-geotilegrid-aggregation.html
 */
export interface GeoTileGridAggregation {
    geotile_grid: GeoTileGridAggregationOptions;
}

export interface GeoTileGridAggregationOptions {
    field: string;
    precision: number;
    bounds?: GeoVertex;
}