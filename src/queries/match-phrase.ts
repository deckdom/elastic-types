import { BasicMatchOptions, MatchOperatorOption, MatchSlopOption } from './common';

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

export interface MatchPhraseQueryOptions extends BasicMatchOptions, MatchOperatorOption, MatchSlopOption { }
