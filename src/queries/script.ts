import { InlineScriptObject, StoredScriptObject } from '../scripts';

/**
 * Filters documents based on a provided script.
 * The script `query` is typically used in a filter context.
 * 
 * @see https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-script-query.html
 */
export interface ScriptQuery {
    script: ScriptQueryOptions;
}

export interface ScriptQueryOptions {
    /**
     * Contains a script to run as a query.
     * This script must return a boolean value, `true` or `false`.
     */
    script: InlineScriptObject | StoredScriptObject;
}
