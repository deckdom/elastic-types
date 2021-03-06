export * from './adjacency-matrix';
export * from './auto-interval-date-histogram';
export * from './avg';
export * from './boxplot';
export * from './cardinality';
export * from './children';
export * from './composite';
export * from './date-histogram';
export * from './diversified-sampler';
export * from './extended-stats';
export * from './filter';
export * from './filters';
export * from './geo-distance';
export * from './geohash-grid';
export * from './geotile-grid';
export * from './global';
export * from './histogram';
export * from './nested';
export * from './stats';
export * from './terms';
export * from './weighted-avg';

import { AdjacencyMatrixAggregation } from './adjacency-matrix';
import { AutoIntervalDateHistogramAggregation } from './auto-interval-date-histogram';
import { AvgAggregation } from './avg';
import { BoxplotAggregation } from './boxplot';
import { CardinalityAggregation } from './cardinality';
import { ChildrenAggregation } from './children';
import { CompositeAggregation } from './composite';
import { DateHistogramAggregation } from './date-histogram';
import { DiversifiedSamplerAggregation } from './diversified-sampler';
import { ExtendedStatsAggregation } from './extended-stats';
import { FilterAggregation } from './filter';
import { FiltersAggregation } from './filters';
import { GeoDistanceAggregation } from './geo-distance';
import { GeoHashGridAggregation } from './geohash-grid';
import { GeoTileGridAggregation } from './geotile-grid';
import { GlobalAggregation } from './global';
import { HistoramAggregation } from './histogram';
import { NestedAggregation } from './nested';
import { StatsAggregation } from './stats';
import { TermsAggregation } from './terms';
import { WeightedAvgAggregation } from './weighted-avg';

export interface Aggregations {
    [name: string]: SingleAggregation;
}

export interface CommonAggregationOptions {
    aggregations: Aggregations;
    aggs: Aggregations;
}

export type MetricsAggregations =
    | AvgAggregation
    | WeightedAvgAggregation
    | BoxplotAggregation
    | CardinalityAggregation
    | StatsAggregation
    | ExtendedStatsAggregation
    ;

export type BucketAggregations =
    | AdjacencyMatrixAggregation
    | AutoIntervalDateHistogramAggregation
    | ChildrenAggregation
    | CompositeAggregation
    | DateHistogramAggregation
    | DiversifiedSamplerAggregation
    | FilterAggregation
    | FiltersAggregation
    | GeoDistanceAggregation
    | GeoHashGridAggregation
    | GeoTileGridAggregation
    | GlobalAggregation
    | HistoramAggregation
    | NestedAggregation
    | TermsAggregation
    ;

export type PipelineAggregations = null
    ;

export type SingleAggregation =
    | MetricsAggregations
    | BucketAggregations
    | PipelineAggregations
    ;
