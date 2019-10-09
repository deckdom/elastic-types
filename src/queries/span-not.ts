import { SpanContainingQueryOptions } from './span-containing';
import { SpanMultiQuery } from './span-multi';
import { SpanNearQuery } from './span-near';
import { SpanTermQuery } from './span-term';

export interface SpanNotQuery {
    span_not: SpanContainingQueryOptions;
}

export interface SpanNotQueryOptions {
    include: SpanTermQuery | SpanNearQuery | SpanMultiQuery;
    exclude: SpanTermQuery | SpanNearQuery | SpanMultiQuery;
    /**
     * If set the amount of tokens before the include span can’t have overlap with the exclude span.
     * Defaults to `0`.
     */
    pre?: number;
    /**
     * If set the amount of tokens after the include span can’t have overlap with the exclude span.
     * Defaults to `0`.
     */
    post?: number;
    /**
     * If set the amount of tokens from within the include span can’t have overlap with the exclude span.
     * Equivalent of setting both `pre` and `post`.
     */
    dist?: number;
}