import { CommonAggregationOptions } from '.';
import { ScriptObject } from '../common';

/**
 * A multi-value metrics aggregation that computes stats over numeric values extracted from the aggregated `documents`.
 * These values can be extracted either from specific numeric fields in the documents,
 * or be generated by a provided script.
 * 
 * The stats that are returned consist of: `min`, `max`, `sum`, `count` and `avg`.
 */
export interface StatsAggregation {
    stats: StatsAggregationOptions;
}

export interface BasicStatsAggregationOptions {
    field?: string;
    script?: ScriptObject;
    /**
     * The missing parameter defines how documents that are missing a value should be treated.
     * By default they will be ignored but it is also possible to treat them as if they had a value.
     */
    missing?: number;
}

export interface StatsAggregationOptions extends BasicStatsAggregationOptions, CommonAggregationOptions {}