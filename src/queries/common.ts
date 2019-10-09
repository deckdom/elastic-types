import { AnalyzerOption, MinimumShouldMatchOption } from '../options';

export interface BasicMatchOptions extends AnalyzerOption, MinimumShouldMatchOption {
    /**
     * Text, number, boolean value or date you wish to find in the provided `<field>`.
     * 
     * The `match` query analyzes any provided text before performing a search.
     * This means the `match` query can search `text` fields for analyzed tokens rather than an exact term.
     */
    query: boolean | number | string;
}

export interface MatchZeroTermsOption {
    /**
     * Indicates whether no documents are returned if the analyzer removes all tokens,
     * such as when using a `stop` filter. Valid values are:
     * * `none` (Default): No documents are returned if the analyzer removes all tokens.
     * * `all`: Returns all documents, similar to a match_all query.
     */
    zero_terms_query?: 'none' | 'all';
}

export interface MatchOperatorOption {
    /**
     * Boolean logic used to interpret text in the query value. Valid values are:
     * 
     * * `OR` (Default): For example, a `query` value of `capital of Hungary`
     *  is interpreted as `capital` OR `of` OR `Hungary`.
     * * `AND`: For example, a `query` value of `capital of Hungary`
     *  is interpreted as `capital` AND `of` AND `Hungary`.
     */
    operator?: 'OR' | 'AND';
}

export interface MatchSlopOption {
    /** 
     * Maximum number of positions allowed between matching tokens.
     * Defaults to `0`. Transposed terms have a slop of `2`.
     */
    slop?: number;
}

export interface BasicQueryStringOptions extends AnalyzerOption {
    /** Query string you wish to parse and use for search. */
    query: string;
    /** Array of fields you wish to search. You can use this parameter query to search across multiple fields. */
    fields?: string[];
    /**
     * Boolean logic used to interpret text in the query value. Valid values are:
     * 
     * * `OR` (Default): For example, a `query` value of `capital of Hungary`
     *  is interpreted as `capital` OR `of` OR `Hungary`.
     * * `AND`: For example, a `query` value of `capital of Hungary`
     *  is interpreted as `capital` AND `of` AND `Hungary`.
     */
    default_operator?: 'OR' | 'AND';
    /**
     * If `true`, match phrase queries are automatically created for multi-term synonyms.
     * Defaults to `true`.
     */
    auto_generate_synonyms_phrase_query?: boolean;
    /** Maximum number of terms to which the query will expand. Defaults to `50`. */
    fuzzy_max_expansions?: number;
    /** Number of beginning characters left unchanged for fuzzy matching. Defaults to `0`. */
    fuzzy_prefix_length?: number;
    /**
     * If `true`, edits for fuzzy matching include transpositions of two adjacent characters (ab → ba).
     * Defaults to `true`.
     */
    fuzzy_transpositions?: boolean;
    /**
     * If `true`, format-based errors, such as providing a text `query` value for a numeric field,
     * are ignored. Defaults to `false`.
     */
    lenient?: boolean;
    /**
     * Minimum number of clauses that must match for a document to be returned.
     * See the `minimum_should_match` parameter for valid values and more information.
     * 
     * @see https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-minimum-should-match.html
     */
    minimum_should_match?: number | string;
    /**
     * Suffix appended to quoted text in the query string.
     * 
     * You can use this suffix to use a different analysis method for exact matches.
     * 
     * @see https://www.elastic.co/guide/en/elasticsearch/reference/current/mixing-exact-search-with-stemming.html
     */
    quote_field_suffix?: string;
}
