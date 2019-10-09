import { SpanFieldMaskingQuery } from './span-field-masking';
import { SpanTermQuery } from './span-term';

export interface SpanNearQuery {
    span_near: SpanNearQueryOptions;
}

export interface SpanNearQueryOptions {
    clauses: (SpanTermQuery | SpanFieldMaskingQuery)[];
    slop?: number;
    in_order?: boolean;
}