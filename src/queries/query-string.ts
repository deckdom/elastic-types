import { BoostOption, RewriteOption, TimeZoneOption } from './options';
import { BasicQueryStringOptions } from './common';

/**
 * Returns documents based on a provided query string, using a parser with a strict syntax.
 * 
 * This query uses a syntax to parse and split the provided query string based on operators,
 * such as `AND` or `NOT`.
 * The query then analyzes each split text independently before returning matching documents.
 * 
 * You can use the `query_string` query to create a complex search that includes wildcard characters,
 * searches across multiple fields, and more. While versatile,
 * the query is strict and returns an error if the query string includes any invalid syntax.
 * 
 * @see https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-query-string-query.html
 */
export interface QueryStringQuery {
    query_string: string | QueryStringQueryOptions;
}

export interface QueryStringQueryOptions extends BasicQueryStringOptions, BoostOption, RewriteOption, TimeZoneOption {
    /**
     * Default field you wish to search if no field is provided in the query string.
     * 
     * Defaults to the `index.query.default_field` index setting, which has a default value of `*`.
     * The `*` value extracts all fields that are eligible to term queries and filters the metadata fields.
     * All extracted fields are then combined to build a query if no `prefix` is specified.
     */
    default_field?: string;
    /**
     * If `true`, the wildcard characters `*` and `?` are allowed
     * as the first character of the query string. Defaults to `true`.
     */
    allow_leading_wildcard?: boolean;
    /**
     * If `true`, enable position increments in queries constructed from a `query_string` search.
     * Defaults to `true`.
     */
    enable_position_increments?: boolean;
    /** Maximum edit distance allowed for matching. */
    fuzziness?: string;
    /**
     * Maximum number of automaton states required for the query. Default is `10000`.
     * 
     * Elasticsearch uses Apache Lucene internally to parse regular expressions.
     * Lucene converts each regular expression to a finite automaton containing a number of determinized states.
     * 
     * You can use this parameter to prevent that conversion from unintentionally consuming too many resources.
     * You may need to increase this limit to run complex regular expressions.
     */
    max_determinized_states?: number;
    /**
     * Analyzer used to convert quoted text in the query string into tokens.
     * Defaults to the `search_quote_analyzer` mapped for the `default_field`.
     * 
     * For quoted text, this parameter overrides the analyzer specified in the `analyzer` parameter.
     */
    quote_analyzer?: string;
    /**
     * Maximum number of positions allowed between matching tokens for phrases.
     * Defaults to `0`. If `0`, exact phrase matches are required.
     * Transposed terms have a slop of `2`.
     */
    phrase_slop?: number;
}
