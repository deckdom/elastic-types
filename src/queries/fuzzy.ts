import { FuzzynessOptions, RewriteOption } from './options';

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
 * 
 * @see https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-fuzzy-query.html
 */
export interface FuzzyQuery {
    fuzzy: {
        [field: string]: FuzzyQueryOptions;
    };
}

export interface FuzzyQueryOptions extends RewriteOption, FuzzynessOptions {
    /** Term you wish to find in the provided `<field>`. */
    value: string;
}
