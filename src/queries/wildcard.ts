import { BoostOption, RewriteOption } from './options';

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
