import { FuzzynessOptions } from '../options';
import { BasicMatchOptions, MatchOperatorOption } from './common';

/**
 * A `match_bool_prefix` query analyzes its input and constructs a `bool` query from the terms.
 * Each term except the last is used in a `term` query. The last term is used in a `prefix` query.
 * 
 * @see https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-match-bool-prefix-query.html
 */
export interface MatchBooleanPrefixQuery {
    match_bool_prefix: {
        [field: string]: boolean | number | string | MatchBooleanPrefixQueryOptions;
    };
}

export interface MatchBooleanPrefixQueryOptions extends BasicMatchOptions, FuzzynessOptions, MatchOperatorOption { }
