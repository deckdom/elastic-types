import { BoostOption } from '../options';

/**
 * Returns documents that contain one or more exact terms in a provided field.
 * 
 * The `terms` query is the same as the `term` query, except you can search for multiple values.
 * 
 * @see https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-terms-query.html
 */
export interface TermsQuery {
    terms: BoostOption & {
        /**
         * Field you wish to search.
         * 
         * The value of this parameter is an array of terms you wish to find in the provided field.
         * To return a document, one or more terms must exactly match a field value, including whitespace and capitalization.
         * 
         * By default, Elasticsearch limits the `terms` query to a maximum of `65,536` terms.
         * You can change this limit using the `index.max_terms_count` setting.
         */
        [field: string]: boolean[] | number[] | string[] | TermsQueryOptions;
    };
}

export interface TermsQueryOptions extends BoostOption {
    /** Name of the index from which to fetch field values. */
    index?: string;
    /** ID of the document from which to fetch field values. */
    id?: string;
    /**
     * Name of the field from which to fetch field values.
     * Elasticsearch uses these values as search terms for the query.
     * 
     * If the field values include an array of nested inner objects,
     * you can access those objects using dot notation syntax.
     */
    path?: string;
    /**
     * Custom routing value of the document from which to fetch term values.
     * If a custom routing value was provided when the document was indexed, this parameter is required.
     */
    routing?: string;
}
