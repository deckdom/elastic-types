export * from './avg';
export * from './weighted-avg';
export * from './boxplot';
export * from './cardinality';
export * from './stats';
export * from './extended-stats';

import { AvgAggregation } from './avg';
import { WeightedAvgAggregation } from './weighted-avg';
import { BoxplotAggregation } from './boxplot';
import { CardinalityAggregation } from './cardinality';
import { StatsAggregation } from './stats';
import { ExtendedStatsAggregation } from './extended-stats';

export interface Aggregations {
    [name: string]: SingleAggregation;
}

export interface CommonAggregationOptions {
    aggregations: Aggregations;
}

export type MetricsAggregations =
    | AvgAggregation
    | WeightedAvgAggregation
    | BoxplotAggregation
    | CardinalityAggregation
    | StatsAggregation
    | ExtendedStatsAggregation
    ;

export type BucketAggregations = null
    ;

export type PipelineAggregations = null
    ;

export type MatrixAggregations = null
    ;

export type SingleAggregation =
    | MetricsAggregations
    | BucketAggregations
    | PipelineAggregations
    | MatrixAggregations
    ;
