import { ScriptOptions } from './options';
import { SearchQuery } from '../queries';

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

export interface IntervalsQueryOptions {
    [field: string]: IntervalRule;
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