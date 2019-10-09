import { SpanNearQuery } from './span-near';
import { SpanTermQuery } from './span-term';

export interface SpanWithinQuery {
    span_within: SpanWithinQueryOptions;
}

export interface SpanWithinQueryOptions {
    little: SpanTermQuery | SpanNearQuery;
    big: SpanTermQuery | SpanNearQuery;
}