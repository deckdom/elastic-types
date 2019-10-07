import { BoostOption, FormatOption, FuzzynessOptions, RewriteOption, ScriptOptions, TimeZoneOption } from '../common';

export type TermLevelQuery = ExistsQuery
    | FuzzyQuery
    | IDsQuery
    | PrefixQuery
    | RangeQuery
    | RegexpQuery
    | TermQuery
    | TermsQuery
    | TermsSetQuery
    | TypeQuery
    | WildcardQuery;

export interface ExistsQueryOptions {
    /**
     * Name of the field you wish to search.
     * While a field is deemed non-existant if the JSON value is `null` or `[]`, these values will indicate the field does exist:
     * 
     * * Empty strings, such as "" or "-"
     * * Arrays containing null and another value, such as [null, "foo"]
     * * A custom null-value, defined in field mapping
     */
    field: string;
}

/**
 * Returns documents that contain an indexed value for a field.
 * An indexed value may not exist for a document’s field due to a variety of reasons:
 * 
 * * The field in the source JSON is null or []
 * * The field has "index" : false set in the mapping
 * * The length of the field value exceeded an ignore_above setting in the mapping
 * * The field value was malformed and ignore_malformed was defined in the mapping
 * 
 * @see https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-exists-query.html
 */
export interface ExistsQuery {
    exists: ExistsQueryOptions;
}

export interface FuzzyQueryOptions extends RewriteOption, FuzzynessOptions {
    /** Term you wish to find in the provided `<field>`. */
    value: string;
}

/**
 * Returns documents that contain terms similar to the search term, as measured by a Levenshtein edit distance.
 * An edit distance is the number of one-character changes needed to turn one term into another.
 * These changes can include:
 * 
 * * Changing a character (box → fox)
 * * Removing a character (black → lack)
 * * Inserting a character (sic → sick)
 * * Transposing two adjacent characters (act → cat)
 * 
 * To find similar terms, the fuzzy query creates a set of all possible variations, or expansions,
 * of the search term within a specified edit distance. The query then returns exact matches for each expansion.

 * @see https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-fuzzy-query.html
 */
export interface FuzzyQuery {
    fuzzy: {
        [field: string]: FuzzyQueryOptions;
    };
}

export interface IDsQueryOptions {
    /** An array of document IDs. */
    values: string[];
}

/**
 * Returns documents based on their IDs. This query uses document IDs stored in the `_id` field.
 * 
 * @see https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-ids-query.html
 */
export interface IDsQuery {
    ids: IDsQueryOptions;
}

export interface PrefixQueryOptions extends RewriteOption {
    /** Beginning characters of terms you wish to find in the provided `<field>.` */
    value: string;
}

/**
 * Returns documents that contain a specific prefix in a provided field.
 * 
 * @see https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-prefix-query.html
 */
export interface PrefixQuery {
    prefix: {
        [field: string]: string | PrefixQueryOptions;
    };
}

export interface RangeQueryOptions extends FormatOption, TimeZoneOption, BoostOption {
    /** Greater than. */
    gt?: number | string;
    /** Greater than or equal to. */
    gte?: number | string;
    /** Less than. */
    lt?: number | string;
    /** Less than or equal to. */
    lte?: number | string;
    /**
     * Indicates how the range query matches values for range fields.
     * Valid values are:
     * 
     * * **INTERSECTS** (Default): Matches documents with a range field value that intersects the query’s range.
     * * **CONTAINS**: Matches documents with a range field value that entirely contains the query’s range.
     * * **WITHIN**: Matches documents with a range field value entirely within the query’s range.
     */
    relation?: 'INTERSECTS' | 'CONTAINS' | 'WITHIN';
}

/**
 * Returns documents that contain terms within a provided range.
 * 
 * @see https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-range-query.html
 */
export interface RangeQuery {
    range: {
        [field: string]: RangeQueryOptions;
    };
}

export interface RegexpQueryOptions extends RewriteOption {
    /**
     * Regular expression for terms you wish to find in the provided `<field>`.
     * For a list of supported operators, see Regular expression syntax.
     * 
     * By default, regular expressions are limited to 1,000 characters.
     * You can change this limit using the `index.max_regex_length` setting.
     */
    value: string;
    /**
     * Enables optional operators for the regular expression.
     * For valid values and more information, see Regular expression syntax.
     */
    flags?: string;
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
}

/**
 * Returns documents that contain terms matching a regular expression.
 * 
 * A regular expression is a way to match patterns in data using placeholder characters, called operators.
 * For a list of operators supported by the `regexp` query, see Regular expression syntax.
 * 
 * @see https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-regexp-query.html
 * @see https://www.elastic.co/guide/en/elasticsearch/reference/current/regexp-syntax.html
 */
export interface RegexpQuery {
    regexp: {
        [field: string]: RegexpQueryOptions;
    };
}

export interface TermQueryOptions extends BoostOption {
    /** 
     * Term you wish to find in the provided `<field>`.
     * To return a document, the term must exactly match the field value, including whitespace and capitalization.
     */
    value: boolean | number | string;
}

/**
 * Returns documents that contain an exact term in a provided field.
 * 
 * You can use the `term` query to find documents based on a precise value such as a price, a product ID, or a username.
 * 
 * @see https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-term-query.html
 */
export interface TermQuery {
    term: {
        [field: string]: boolean | number | string | TermQueryOptions;
    };
}

export interface TermsQueryOptions extends BoostOption {
    /** Name of the index from which to fetch field values. */
    index?: string;
    /** ID of the document from which to fetch field values. */
    id?: string;
    /**
     * Name of the field from which to fetch field values.
     * Elasticsearch uses these values as search terms for the query.
     * 
     * If the field values include an array of nested inner objects,
     * you can access those objects using dot notation syntax.
     */
    path?: string;
    /**
     * Custom routing value of the document from which to fetch term values.
     * If a custom routing value was provided when the document was indexed, this parameter is required.
     */
    routing?: string;
}

/**
 * Returns documents that contain one or more exact terms in a provided field.
 * 
 * The `terms` query is the same as the `term` query, except you can search for multiple values.
 * 
 * @see https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-terms-query.html
 */
export interface TermsQuery {
    terms: TermQueryOptions & {
        /**
         * Field you wish to search.
         * 
         * The value of this parameter is an array of terms you wish to find in the provided field.
         * To return a document, one or more terms must exactly match a field value, including whitespace and capitalization.
         * 
         * By default, Elasticsearch limits the `terms` query to a maximum of `65,536` terms.
         * You can change this limit using the `index.max_terms_count` setting.
         */
        [field: string]: boolean[] | number[] | string[] | TermsQueryOptions;
    };
}

export interface TermsSetQueryOptions extends BoostOption {
    /**
     * Array of terms you wish to find in the provided `<field>`.
     * To return a document, a required number of terms must exactly match the field values,
     * including whitespace and capitalization.
     * 
     * The required number of matching terms is defined in the `minimum_should_match_field`
     * or `minimum_should_match_script` parameter.
     */
    terms: string[];
    /** Numeric field containing the number of matching terms required to return a document. */
    minimum_should_match_field?: string;
    /**
     * Custom script containing the number of matching terms required to return a document.
     * 
     * For parameters and valid values, see Scripting.
     * 
     * @see https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-scripting.html
     */
    minimum_should_match_script?: ScriptOptions;
}

/**
 * Returns documents that contain a minimum number of exact terms in a provided field.
 * 
 * The `terms_set` query is the same as the `terms` query,
 * except you can define the number of matching terms required to return a document.
 * For example:
 * 
 * * A field, `programming_languages`, contains a list of known programming languages,
 *  such as `c++`, `java`, or `php` for job candidates.
 *  You can use the `terms_set` query to return documents that match at least two of these languages.
 * * A field, `permissions`, contains a list of possible user permissions for an application.
 *  You can use the `terms_set` query to return documents that match a subset of these permissions.
 * 
 * @see https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-terms-set-query.html
 */
export interface TermsSetQuery {
    terms_set: {
        [field: string]: TermsSetQueryOptions;
    };
}

/**
 * Filters documents matching the provided document / mapping type.
 * 
 * @see https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-type-query.html
 */
export interface TypeQuery {
    type: {
        value: string;
    };
}

export interface WildcardQueryOptions extends BoostOption, RewriteOption {
    /**
     * Wildcard pattern for terms you wish to find in the provided <field>.
     * 
     * This parameter supports two wildcard operators:
     * * `?`, which matches any single character
     * * `*`, which can match zero or more characters, including an empty one
     */
    value: string;
}

/**
 * Returns documents that contain terms matching a wildcard pattern.
 * 
 * A wildcard operator is a placeholder that matches one or more characters.
 * For example, the `*` wildcard operator matches zero or more characters.
 * You can combine wildcard operators with other characters to create a wildcard pattern.
 * 
 * @see https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-wildcard-query.html
 */
export interface WildcardQuery {
    wildcard: {
        [field: string]: WildcardQueryOptions;
    };
}
