import { SpanFieldMaskingQuery } from './span-field-masking';
import { SpanNearQuery } from './span-near';
import { SpanTermQuery } from './span-term';

export interface SpanOrQuery {
    span_or: SpanOrQueryOptions;
}

export interface SpanOrQueryOptions {
    clauses: (SpanTermQuery | SpanNearQuery | SpanFieldMaskingQuery)[];
}