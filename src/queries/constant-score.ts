import { BoostOption } from '../options';
import { SearchQuery } from '../queries';

/**
 * Wraps a `filter` query and returns every matching document
 * with a relevance score equal to the `boost` parameter value.
 * 
 * @see https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-constant-score-query.html
 */
export interface ConstantScoreQuery {
    constant_score: ConstantScoreQueryOptions;
}

export interface ConstantScoreQueryOptions extends BoostOption {
    filter: SearchQuery;
}
