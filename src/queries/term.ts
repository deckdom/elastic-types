import { BoostOption } from '../options';

/**
 * Returns documents that contain an exact term in a provided field.
 * 
 * You can use the `term` query to find documents based on a precise value such as a price, a product ID, or a username.
 * 
 * @see https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-term-query.html
 */
export interface TermQuery {
    term: {
        [field: string]: boolean | number | string | TermQueryOptions;
    };
}

export interface TermQueryOptions extends BoostOption {
    /** 
     * Term you wish to find in the provided `<field>`.
     * To return a document, the term must exactly match the field value, including whitespace and capitalization.
     */
    value: boolean | number | string;
}
