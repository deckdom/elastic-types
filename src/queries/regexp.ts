import { RewriteOption } from '../options';

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
