export interface MinimumShouldMatchOption {
    /**
     * Minimum number of clauses that must match for a document to be returned.
     * See the `minimum_should_match parameter` for valid values and more information.
     * 
     * @see https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-minimum-should-match.html
     */
    minimum_should_match?: number | string;
}

export interface BoostOption {
    /**
     * Floating point number used to decrease or increase the relevance scores of a query. Defaults to `1.0`.
     * 
     * You can use the `boost` parameter to adjust relevance scores for searches containing two or more queries.
     * Boost values are relative to the default value of `1.0`.
     * 
     * A boost value between `0` and `1.0` decreases the relevance score.
     * A value greater than `1.0` increases the relevance score.
     */
    boost?: number;
}

export interface RewriteOption {
    /**
     * Method used to rewrite the query. For valid values and more information, see the rewrite parameter.
     * 
     * @see https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-multi-term-rewrite.html
     */
    rewrite?: string;
}

export interface FormatOption {
    /**
     * Date format used to convert date values in the query.
     * 
     * By default, Elasticsearch uses the date format provided in the `<field>`'s mapping.
     * This value overrides that mapping format.
     * 
     * @see https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping-date-format.html
     */
    format?: string;
}

export interface TimeZoneOption {
    /**
     * Coordinated Universal Time (UTC) offset or IANA time zone used to convert `date` values in the query to UTC.
     * 
     * Valid values are ISO 8601 UTC offsets, such as `+01:00` or `-08:00`,
     * and IANA time zone IDs, such as `America/Los_Angeles`.
     */
    time_zone?: string;
}

export interface AnalyzerOption {
    /**
     * Analyzer used to convert the text in the `query` value into tokens.
     * Defaults to the index-time analyzer mapped for the `<field>`.
     * If no analyzer is mapped, the index’s default analyzer is used.
     */
    analyzer?: string;
}

export interface IgnoreUnmappedOption {
    /**
     * When set to `true` the `ignore_unmapped` option will ignore an unmapped field
     * and will not match any documents for this query.
     * This can be useful when querying multiple indexes which might have different mappings.
     * When set to `false` (the default value) the query will
     * throw an exception if the field is not mapped.
     */
    ignore_unmapped?: boolean;
}

export interface FuzzynessOptions {
    /** Maximum edit distance allowed for matching. */
    fuzziness?: string;
    /** Number of beginning characters left unchanged for fuzzy matching. Defaults to `0`. */
    prefix_length?: number;
    /** Maximum number of terms to which the query will expand. Defaults to `50`. */
    max_expansions?: number;
    /**
     * If `true`, edits for fuzzy matching include transpositions of two adjacent characters (ab → ba).
     * Defaults to `true`.
     */
    transpositions?: boolean;
    /**
     * Method used to rewrite the query.
     * See the `rewrite` parameter for valid values and more information.
     * 
     * If the fuzziness parameter is not `0`,
     * the `match` query uses a `rewrite` method of `top_terms_blended_freqs_${max_expansions}` by default.
     */
    fuzzy_rewrite?: string;
}