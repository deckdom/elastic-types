import { BasicQueryStringOptions } from './common';

/**
 * Returns documents based on a provided query string,
 * using a parser with a limited but fault-tolerant syntax.
 * 
 * This query uses a simple syntax to parse and split the provided query string
 * into terms based on special operators. The query then analyzes each term
 * independently before returning matching documents.
 * 
 * While its syntax is more limited than the `query_string query`,
 * the `simple_query_string` query does not return errors for invalid syntax.
 * Instead, it ignores any invalid parts of the query string.
 * 
 * @see https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-simple-query-string-query.html
 */
export interface SimpleQueryStringQuery {
    simple_query_string: {
        [field: string]: string;
    } | SimpleQUeryStringQueryOptions;
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
