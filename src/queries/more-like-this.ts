import { BoostOption, MinimumShouldMatchOption } from './options';

/**
 * The More Like This Query finds documents that are "like" a given set of documents.
 * In order to do so, MLT selects a set of representative terms of these input documents,
 * forms a query using these terms, executes the query and returns the results.
 * The user controls the input documents, how the terms should be selected
 * and how the query is formed.
 * 
 * @see https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-mlt-query.html
 */
export interface MoreLikeThisQuery {
    more_like_this: MoreLikeThisQueryOptions;
}

export interface MoreLikeThisQueryOptions extends MinimumShouldMatchOption, BoostOption {
    fields: string[];
    /**
     * When specifying documents, the text is fetched from fields unless overridden in each document request.
     * The text is analyzed by the analyzer at the field, but could also be overridden.
     * The syntax to override the analyzer at the field follows a similar syntax
     * to the `per_field_analyzer` parameter of the Term Vectors API.
     * Additionally, to provide documents not necessarily present in the index,
     * artificial documents are also supported.
     */
    like: string | (string | MoreLikeThisDocumentQuery)[];
    /**
     * The unlike parameter is used in conjunction with like in order not to select terms found in a chosen set of documents.
     * In other words, we could ask for documents `like: "Apple"`, but `unlike: "cake crumble tree"`. 
     */
    unlike: string | (string | MoreLikeThisDocumentQuery)[];
    /**
     * The maximum number of query terms that will be selected.
     * Increasing this value gives greater accuracy at the expense of query execution speed.
     * Defaults to `25`.
     */
    max_query_terms?: number;
    /**
     * The minimum term frequency below which the terms will be ignored from the input document.
     * Defaults to `2`.
     */
    min_term_freq?: number;
    /**
     * The minimum document frequency below which the terms will be ignored from the input document.
     * Defaults to `5`.
     */
    min_doc_freq?: number;
    /**
     * The maximum document frequency above which the terms will be ignored from the input document.
     * This could be useful in order to ignore highly frequent words such as stop words.
     * Defaults to unbounded (`0`).
     */
    max_doc_freq?: number;
    /**
     * The minimum word length below which the terms will be ignored.
     * The old name `min_word_len` is deprecated.
     * Defaults to `0`.
     */
    min_word_length?: number;
    /**
     * The maximum word length above which the terms will be ignored.
     * The old name `max_word_len` is deprecated.
     * Defaults to unbounded (`0`).
     */
    max_word_length?: number;
    /**
     * An array of stop words. Any word in this set is considered "uninteresting" and ignored.
     * If the analyzer allows for stop words, you might want to tell MLT to explicitly ignore them,
     * as for the purposes of document similarity it seems reasonable
     * to assume that "a stop word is never interesting".
     */
    stop_words?: string[];
    /**
     * The analyzer that is used to analyze the free form text.
     * Defaults to the analyzer associated with the first field in fields.
     */
    analyzer?: string;
    /**
     * Controls whether the query should fail (throw an exception) if any of the specified fields
     * are not of the supported types (`text` or `keyword`).
     * Set this to `false` to ignore the field and continue processing.
     * Defaults to `true`.
     */
    fail_on_unsupported_field?: boolean;
    /**
     * Each term in the formed query could be further boosted by their tf-idf score.
     * This sets the boost factor to use when using this feature.
     * Defaults to deactivated (`0`).
     * Any other positive value activates terms boosting with the given boost factor.
     */
    boost_terms?: number;
    /**
     * Specifies whether the input documents should also be included in the search results returned.
     * Defaults to `false`.
     */
    include?: boolean;
}

export interface MoreLikeThisDocumentQuery {
    _index: string;
    _id?: string;
    _routing?: string;
    _source?: boolean;
    source_include?: string[];
    source_exclude?: string[];
    _stored_fields?: string[];
}