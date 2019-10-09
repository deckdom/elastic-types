import { SpanTermQuery } from './span-term';

export interface SpanFirstQuery {
    span_first: SpanFirstQueryOptions;
}

export interface SpanFirstQueryOptions {
    match: SpanTermQuery;
    end: number;
}