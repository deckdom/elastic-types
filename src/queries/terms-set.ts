import { BoostOption, ScriptOptions } from '../options';

/**
 * Returns documents that contain a minimum number of exact terms in a provided field.
 * 
 * The `terms_set` query is the same as the `terms` query,
 * except you can define the number of matching terms required to return a document.
 * For example:
 * 
 * * A field, `programming_languages`, contains a list of known programming languages,
 *  such as `c++`, `java`, or `php` for job candidates.
 *  You can use the `terms_set` query to return documents that match at least two of these languages.
 * * A field, `permissions`, contains a list of possible user permissions for an application.
 *  You can use the `terms_set` query to return documents that match a subset of these permissions.
 * 
 * @see https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-terms-set-query.html
 */
export interface TermsSetQuery {
    terms_set: {
        [field: string]: TermsSetQueryOptions;
    };
}

export interface TermsSetQueryOptions extends BoostOption {
    /**
     * Array of terms you wish to find in the provided `<field>`.
     * To return a document, a required number of terms must exactly match the field values,
     * including whitespace and capitalization.
     * 
     * The required number of matching terms is defined in the `minimum_should_match_field`
     * or `minimum_should_match_script` parameter.
     */
    terms: string[];
    /** Numeric field containing the number of matching terms required to return a document. */
    minimum_should_match_field?: string;
    /**
     * Custom script containing the number of matching terms required to return a document.
     * 
     * For parameters and valid values, see Scripting.
     * 
     * @see https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-scripting.html
     */
    minimum_should_match_script?: ScriptOptions;
}
