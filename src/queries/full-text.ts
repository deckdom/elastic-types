import {
    AnalyzerOption,
    BoostOption,
    FuzzynessOptions,
    MinimumShouldMatchOption,
    RewriteOption,
    ScriptOptions,
    TimeZoneOption,
} from '../common';
import { SearchQuery } from './search-query';

export type FullTextQuery = IntervalsQuery
    | MatchQuery
    | MatchBooleanPrefixQuery
    | MatchPhraseQuery
    | MatchPhrasePrefixQuery
    | MultiMatchQuery
    | QueryStringQuery
    | SimpleQueryStringQuery;

export interface IntervalsQueryOptions {
    [field: string]: IntervalRule;
}

/**
 * Returns documents based on the order and proximity of matching terms.
 * 
 * The `intervals` query uses matching rules, constructed from a small set of definitions.
 * Theses rules are then applied to terms from a specified `field`.
 * 
 * The definitions produce sequences of minimal intervals that span terms in a body of text.
 * These intervals can be further combined and filtered by parent sources.
 * 
 * @see https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-intervals-query.html
 */
export interface IntervalsQuery {
    intervals: IntervalsQueryOptions;
}

export type IntervalRule = MatchInterval | PrefixInterval | WildcardInterval | AllOfInterval | AnyOfInterval | FilterInterval;

/**
 * The match rule matches analyzed text.
 */
export interface MatchInterval {
    match: {
        /** Text you wish to find in the provided `<field>`. */
        query: string;
        /**
         * Maximum number of positions between the matching terms.
         * Terms further apart than this are not considered matches. Defaults to `-1`.
         * 
         * If unspecified or set to `-1`, there is no width restriction on the match.
         * If set to `0`, the terms must appear next to each other.
         */
        max_gaps?: number;
        /**  If `true`, matching terms must appear in their specified order. Defaults to `false`. */
        ordered?: boolean;
        /** Analyzer used to analyze terms in the `query`. Defaults to the top-level `<field>`'s analyzer. */
        analyzer?: string;
        /** An optional interval filter. */
        filter?: SearchQuery;
        /**
         * If specified, then match intervals from this field rather than the top-level `<field>`.
         * Terms are analyzed using the search analyzer from this field.
         * This allows you to search across multiple fields as if they were all the same field;
         * for example, you could index the same text into stemmed and unstemmed fields,
         * and search for stemmed tokens near unstemmed ones.
         */
        use_field?: string;
    };
}

/**
 * The `prefix` rule matches terms that start with a specified set of characters.
 * This prefix can expand to match at most 128 terms.
 * If the prefix matches more than 128 terms, Elasticsearch returns an error.
 * You can use the `index-prefixes` option in the field mapping to avoid this limit.
 */
export interface PrefixInterval {
    prefix: {
        /** Beginning characters of terms you wish to find in the top-level `<field>`. */
        prefix: string;
        /** Analyzer used to normalize the prefix. Defaults to the top-level `<field>`'s analyzer. */
        analyzer?: string;
        /**
         * If specified, then match intervals from this field rather than the top-level `<field>`.
         * 
         * The `prefix` is normalized using the search analyzer from this field,
         * unless a separate `analyzer` is specified.
         */
        use_field?: string;
    };
}

/**
 * The `wildcard` rule matches terms using a wildcard pattern.
 * This pattern can expand to match at most 128 terms.
 * If the pattern matches more than 128 terms, Elasticsearch returns an error.
 */
export interface WildcardInterval {
    wildcard: {
        /**
         * Wildcard pattern used to find matching terms.
         * 
         * This parameter supports two wildcard operators:
         * 
         * * `?`, which matches any single character
         * * `*`, which can match zero or more characters, including an empty one
         */
        pattern: string;
        /** Analyzer used to normalize the prefix. Defaults to the top-level `<field>`'s analyzer. */
        analyzer?: string;
        /**
         * If specified, then match intervals from this field rather than the top-level `<field>`.
         * 
         * The `pattern` is normalized using the search analyzer from this field,
         * unless a separate `analyzer` is specified.
         */
        use_field?: string;
    };
}

/**
 * The`all_of` rule returns matches that span a combination of other rules.
 */
export interface AllOfInterval {
    all_of: {
        /**
         * An array of rules to combine.
         * All rules must produce a match in a document for the overall source to match.
         */
        intervals: IntervalRule[];
        /**
         * Maximum number of positions between the matching terms.
         * Terms further apart than this are not considered matches. Defaults to `-1`.
         * 
         * If unspecified or set to `-1`, there is no width restriction on the match.
         * If set to `0`, the terms must appear next to each other.
         */
        max_gaps?: number;
        /**  If `true`, matching terms must appear in their specified order. Defaults to `false`. */
        ordered?: boolean;
        /** An optional interval filter. */
        filter?: SearchQuery;
    };
}

/**
 * The`any_of` rule returns intervals produced by any of its sub-rules.
 */
export interface AnyOfInterval {
    any_of: {
        /** An array of rules to match. */
        intervals: IntervalRule[];
        /** An optional interval filter. */
        filter?: SearchQuery;
    };
}

/**
 * The filter rule returns intervals based on a query.
 */
export interface FilterInterval {
    filter: {
        /** Query used to return intervals that follow an interval from the `filter` rule. */
        after?: SearchQuery;
        /** Query used to return intervals that occur before an interval from the `filter` rule. */
        before?: SearchQuery;
        /** Query used to return intervals contained by an interval from the `filter` rule. */
        contained_by?: SearchQuery;
        /** Query used to return intervals that contain an interval from the `filter` rule. */
        containing?: SearchQuery;
        /** Query used to return intervals that are **not** contained by an interval from the `filter` rule. */
        not_contained_by?: SearchQuery;
        /** Query used to return intervals that do **not** contain an interval from the `filter` rule. */
        not_containing?: SearchQuery;
        /** Query used to return intervals that do **not** overlap with an interval from the `filter` rule. */
        not_overlapping?: SearchQuery;
        /** Query used to return intervals that overlap with an interval from the `filter` rule. */
        overlapping?: SearchQuery;
        /**
         * Script used to return matching documents.
         * This script must return a boolean value, `true` or `false`.
         */
        script?: ScriptOptions;
    };
}

export interface BasicMatchOptions extends AnalyzerOption, MinimumShouldMatchOption {
    /**
     * Text, number, boolean value or date you wish to find in the provided `<field>`.
     * 
     * The `match` query analyzes any provided text before performing a search.
     * This means the `match` query can search `text` fields for analyzed tokens rather than an exact term.
     */
    query: boolean | number | string;
}

interface MatchZeroTermsOption {
    /**
     * Indicates whether no documents are returned if the analyzer removes all tokens,
     * such as when using a `stop` filter. Valid values are:
     * * `none` (Default): No documents are returned if the analyzer removes all tokens.
     * * `all`: Returns all documents, similar to a match_all query.
     */
    zero_terms_query?: 'none' | 'all';
}

interface MatchOperatorOption {
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

export interface MatchBooleanPrefixQueryOptions extends BasicMatchOptions, FuzzynessOptions, MatchOperatorOption {}

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

export interface MatchPhraseQueryOptions extends BasicMatchOptions, MatchOperatorOption, MatchSlopOption {}

/**
 * The `match_phrase` query analyzes the text and creates a `phrase` query out of the analyzed text.
 * 
 * @see https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-match-query-phrase.html
 */
export interface MatchPhraseQuery {
    match_phrase: {
        [field: string]: boolean | number | string | MatchPhraseQueryOptions;
    };
}

/**
 * Returns documents that contain the words of a provided text, in the same order as provided.
 * The last term of the provided text is treated as a prefix,
 * matching any words that begin with that term.
 * 
 * @see https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-match-query-phrase-prefix.html
 */
export interface MatchPhrasePrefixQuery {
    match_phrase_prefix: {
        [field: string]: boolean | number | string | MatchPhraseQueryOptions;
    };
}

export interface MultiMatchQueryOptions extends MatchQueryOptions {
    /**
     * If no `fields` are provided, the `multi_match` query defaults to
     * the `index.query.default_field` index settings, which in turn
     * defaults to `*. *` extracts all fields in the mapping
     * that are eligible to term queries and filters the metadata fields.
     * All extracted fields are then combined to build a query.
     */
    fields?: string[];
    /**
     * The way the `multi_match query` is executed internally depends on the type parameter,
     * which can be set to:
     * * `best_fields`: (default) Finds documents which match any field,
     *   but uses the `_score` from the best field.
     * * `most_fields`: Finds documents which match any field and combines the `_score` from each field.
     * * `cross_fields`: Treats fields with the same `analyzer` as though they were one big field.
     *   Looks for each word in any field.
     * * `phrase`: Runs a `match_phrase` query on each field and uses the `_score` from the best field.
     * * `phrase_prefix`: Runs a `match_phrase_prefix` query on each field
     *   and uses the `_score` from the best field.
     * * `bool_prefix`: Creates a `match_bool_prefix` query on each field
     *   and combines the `_score` from each field.
     */
    type?: 'best_fields' | 'most_fields' | 'cross_fields' | 'phrase' | 'phrase_prefix' | 'bool_prefix';
}

/**
 * The `multi_match` query builds on the `match` query to allow multi-field queries.
 * 
 * @see https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-multi-match-query.html
 */
export interface MultiMatchQuery {
    multi_match: MultiMatchQueryOptions;
}

interface BasicQueryStringOptions extends AnalyzerOption {
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

export interface QueryStringQuery {
    query_string: string | QueryStringQueryOptions;
}

export interface SimpleQUeryStringQueryOptions extends BasicQueryStringOptions {
    /** If `true`, search all searchable fields in the index’s field mapping. */
    all_fields?: boolean;
    /** If `true`, the query attempts to analyze wildcard terms in the query string. Defaults to `false`. */
    analyze_wildcard?: boolean;
    /**
     * List of enabled operators for the simple query string syntax.
     * Defaults to `ALL` (all operators).
     * See Limit operators for valid values.
     * 
     * @see https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-simple-query-string-query.html#supported-flags
     */
    flags?: string;
}

export interface SimpleQueryStringQuery {
    [field: string]: string | SimpleQUeryStringQueryOptions;
}
