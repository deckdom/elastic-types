import { FuzzyQuery } from './fuzzy';
import { PrefixQuery } from './prefix';
import { RangeQuery } from './range';
import { RegexpQuery } from './regexp';
import { WildcardQuery } from './wildcard';

/**
 * The span_multi query allows you to wrap a multi term query as a span query,
 * so it can be nested.
 */
export interface SpanMultiQuery {
    span_multi: SpanMultiQueryOptions;
}

export interface SpanMultiQueryOptions {
    match: FuzzyQuery | PrefixQuery | RangeQuery | RegexpQuery | WildcardQuery;
}