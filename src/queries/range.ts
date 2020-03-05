import { BoostOption, FormatOption, TimeZoneOption } from './options';

/**
 * Returns documents that contain terms within a provided range.
 * 
 * @see https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-range-query.html
 */
export interface RangeQuery {
    range: {
        [field: string]: RangeQueryOptions;
    };
}

export interface RangeQueryOptions extends FormatOption, TimeZoneOption, BoostOption {
    /** Greater than. */
    gt?: number | string;
    /** Greater than or equal to. */
    gte?: number | string;
    /** Less than. */
    lt?: number | string;
    /** Less than or equal to. */
    lte?: number | string;
    /**
     * Indicates how the range query matches values for range fields.
     * Valid values are:
     * 
     * * **INTERSECTS** (Default): Matches documents with a range field value that intersects the query’s range.
     * * **CONTAINS**: Matches documents with a range field value that entirely contains the query’s range.
     * * **WITHIN**: Matches documents with a range field value entirely within the query’s range.
     */
    relation?: 'INTERSECTS' | 'CONTAINS' | 'WITHIN';
}
