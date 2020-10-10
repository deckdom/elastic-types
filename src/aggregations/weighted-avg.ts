import { CommonAggregationOptions } from '.';
import { FieldType } from '../common/types';
import { BasicAvgAggregationOptions } from './avg';

/**
 * A `single-value` metrics aggregation that computes the weighted average of numeric values that are extracted
 * from the aggregated documents. These values can be extracted either from specific numeric fields in the documents.
 * 
 * When calculating a regular average, each datapoint has an equal "weight" …​ it contributes equally to the final value.
 * Weighted averages, on the other hand, weight each datapoint differently. The amount that each datapoint contributes
 * to the final value is extracted from the document, or provided by a script.
 * 
 * As a formula, a weighted average is the `∑(value * weight) / ∑(weight)`
 * 
 * A regular average can be thought of as a weighted average where every value has an implicit weight of `1`.
 * 
 * @see https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-weight-avg-aggregation.html
 */
export interface WeightedAvgAggregation {
    weighted_avg: WeightedAvgAggregationOptions;
}

export interface WeightedAvgAggregationOptions extends CommonAggregationOptions {
    value: BasicAvgAggregationOptions;
    weight: BasicAvgAggregationOptions;
    format?: string;
    value_type?: FieldType;
}