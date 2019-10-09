import { SearchQuery } from '../queries';
import { InlineScriptObject, StoredScriptObject } from './common';
/**
 * Uses a script to provide a custom score for returned documents.
 * The script_score query is useful if, for example,
 * a scoring function is expensive and you only need
 * to calculate the score of a filtered set of documents.
 * 
 * @see https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-script-score-query.html
 */
export interface ScriptScoreQuery {
    script_score: ScriptScoreQueryOptions;
}

export interface ScriptScoreQueryOptions {
    /** Query used to return documents. */
    query: SearchQuery;
    /** Script used to compute the score of documents returned by the query. */
    script: InlineScriptObject | StoredScriptObject;
    /** Documents with a relevance score lower than this floating point number are excluded from the search results. */
    min_score?: number;
}