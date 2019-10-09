import { SpanMultiQuery } from './span-multi';
import { SpanNearQuery } from './span-near';
import { SpanTermQuery } from './span-term';

export interface SpanFirstQuery {
    span_first: SpanFirstQueryOptions;
}

export interface SpanFirstQueryOptions {
    match: SpanTermQuery | SpanMultiQuery | SpanNearQuery;
    end: number;
}