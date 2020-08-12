import { SearchQuery } from '../queries';
import { GeoPosition } from './geo';
import { InlineScriptObject, StoredScriptObject } from './scripts';

export interface NestedSortingOption {
    /**
     * Defines on which nested object to sort. The actual sort field must
     * be a direct field inside this nested object. When sorting by nested
     * field, this field is mandatory. 
     */
    path: string;
    /**
     * A filter that the inner objects inside the nested path should match
     * with in order for its field values to be taken into account by sorting.
     * Common case is to repeat the query / filter inside
     * the nested filter or query.
     * 
     * By default no `nested_filter` is active. 
     */
    filter?: SearchQuery;
    /**
     * The maximum number of children to consider per root document when
     * picking the sort value.
     * 
     * Defaults to unlimited. 
     */
    max_children?: number;
    /**
     * Same as top-level `nested` but applies to another
     * nested path within the current nested object. 
     */
    nested?: NestedSortingOption;
}

interface BaseSortingOption {
    /**
     * The order option can have the following values:
     * * `asc`: Sort in ascending order
     * * `desc`: Sort in descending order
     */
    order?: 'asc' | 'desc';
    /**
     * Indicates if the unmapped field should be treated as a missing value.
     * Setting it to `true` is equivalent to specifying an `unmapped_type` in
     * the field sort.
     * 
     * The default is `false` (unmapped field cause the search to fail). 
     */
    ignore_unmapped?: boolean;
}

export interface ValueSortingOption {
    /**
     * For numeric fields it is also possible to cast the values from one type
     * to another using the numeric_type option.
     * This option accepts the following values:
     * * `double`
     * * `long`
     * * `date`
     * * `date_nanos`
     * 
     * and can be useful for cross-index search if the sort field is mapped
     * differently on some indices.
     */
    numeric_type?: 'double' | 'long' | 'date' | 'date_nanos';
    /**
     * Elasticsearch also supports sorting by fields that are inside one
     * or more nested objects. The sorting by nested field support
     * has a `nested` sort option.
     */
    nested?: NestedSortingOption;
    /**
     * Elasticsearch supports sorting by array or multi-valued fields.
     * The mode option controls what array value is picked for sorting
     * the document it belongs to.
     * The mode option can have the following values:
     * * `min`: Pick the lowest value.
     * * `max`: Pick the highest value.
     * * `sum`: Use the sum of all values as sort value.
     * Only applicable for number based array fields.
     * * `avg`: Use the average of all values as sort value.
     * Only applicable for number based array fields.
     * * `median`: Use the median of all values as sort value.
     * Only applicable for number based array fields.
     */
    mode?: 'min' | 'max' | 'sum' | 'avg' | 'median';
    /**
     * The missing parameter specifies how docs which are missing the
     * sort field should be treated: The missing value can be set to
     * `_last`, `_first`, or a custom value (that will be used for
     * missing docs as the sort value).
     * 
     * The default is `_last`.
     */
    missing?: string | '_first' | '_last';
    /**
     * By default, the search request will fail if there is no mapping
     * associated with a field. The `unmapped_type` option allows you to
     * ignore fields that have no mapping and not sort by them.
     * The value of this parameter is used to determine
     * what sort values to emit.
     */
    unmapped_type?: 'double' | 'long' | 'date' | 'date_nanos';
}

/**
 * @see https://www.elastic.co/guide/en/elasticsearch/reference/current/search-request-body.html#request-body-search-sort
 */
export type SortingOption =
    { '_geo_distance': GeoSortingOption } |
    { '_script': ScriptSortingOption } |
    { [field: string]: 'asc' | 'desc' | ValueSortingOption };

export interface GeoSortingOption extends BaseSortingOption {
    'pin.location': GeoPosition | GeoPosition[];
    /**
     * How to compute the distance.
     * Can either be `arc` (default), or `plane` (faster, but inaccurate
     * on long distances and close to the poles).
     */
    distance_type: 'arc' | 'plane';
    /**
     * What to do in case a field has several geo points. By default,
     * the shortest distance is taken into account when sorting in ascending
     * order and the longest distance when sorting in descending order.
     * Supported values are `min`, `max`, `median` and `avg`.
     */
    mode?: 'min' | 'max' | 'avg' | 'median';
    /**
     * The unit to use when computing sort values.
     * 
     * The default is `m` (meters). 
     */
    unit?: 'mm' | 'cm' | 'm' | 'km' | 'in' | 'ft' | 'yd' | 'mi' | 'nmi' | 'NM';
}

export interface ScriptSortingOption extends BaseSortingOption {
    type?: 'number' | 'string';
    script: InlineScriptObject | StoredScriptObject;
}