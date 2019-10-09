import { FuzzynessOptions } from '../options';
import { BasicMatchOptions, MatchOperatorOption, MatchZeroTermsOption } from './common';

/**
 * Returns documents that match a provided text, number, date or boolean value.
 * The provided text is analyzed before matching.
 * 
 * The `match` query is the standard query for performing a full-text search,
 * including options for fuzzy matching.
 * 
 * @see https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-match-query.html
 */
export interface MatchQuery {
    match: {
        [field: string]: boolean | number | string | MatchQueryOptions;
    };
}

export interface MatchQueryOptions extends BasicMatchOptions, FuzzynessOptions, MatchZeroTermsOption, MatchOperatorOption {
    /**
     * If `true`, match phrase queries are automatically created for multi-term synonyms. Defaults to `true`.
     */
    auto_generate_synonyms_phrase_query?: boolean;
    /**
     * If `true`, format-based errors, such as providing a text `query` value for a numeric field,
     * are ignored. Defaults to `false`.
     */
    lenient?: boolean;
}