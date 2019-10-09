import { MatchQueryOptions } from './match';

/**
 * The `multi_match` query builds on the `match` query to allow multi-field queries.
 * 
 * @see https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-multi-match-query.html
 */
export interface MultiMatchQuery {
    multi_match: MultiMatchQueryOptions;
}

export interface MultiMatchQueryOptions extends MatchQueryOptions {
    /**
     * If no `fields` are provided, the `multi_match` query defaults to
     * the `index.query.default_field` index settings, which in turn
     * defaults to `*. *` extracts all fields in the mapping
     * that are eligible to term queries and filters the metadata fields.
     * All extracted fields are then combined to build a query.
     */
    fields?: string[];
    /**
     * The way the `multi_match query` is executed internally depends on the type parameter,
     * which can be set to:
     * * `best_fields`: (default) Finds documents which match any field,
     *   but uses the `_score` from the best field.
     * * `most_fields`: Finds documents which match any field and combines the `_score` from each field.
     * * `cross_fields`: Treats fields with the same `analyzer` as though they were one big field.
     *   Looks for each word in any field.
     * * `phrase`: Runs a `match_phrase` query on each field and uses the `_score` from the best field.
     * * `phrase_prefix`: Runs a `match_phrase_prefix` query on each field
     *   and uses the `_score` from the best field.
     * * `bool_prefix`: Creates a `match_bool_prefix` query on each field
     *   and combines the `_score` from each field.
     */
    type?: 'best_fields' | 'most_fields' | 'cross_fields' | 'phrase' | 'phrase_prefix' | 'bool_prefix';
}