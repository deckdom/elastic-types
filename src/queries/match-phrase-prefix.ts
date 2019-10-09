import { BasicMatchOptions, MatchOperatorOption, MatchSlopOption } from './common';

/**
 * Returns documents that contain the words of a provided text, in the same order as provided.
 * The last term of the provided text is treated as a prefix,
 * matching any words that begin with that term.
 * 
 * @see https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-match-query-phrase-prefix.html
 */
export interface MatchPhrasePrefixQuery {
    match_phrase_prefix: {
        [field: string]: boolean | number | string | MatchPhrasePrefixQueryOptions;
    };
}

export interface MatchPhrasePrefixQueryOptions extends BasicMatchOptions, MatchOperatorOption, MatchSlopOption { }