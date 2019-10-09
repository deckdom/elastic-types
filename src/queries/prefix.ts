import { RewriteOption } from '../options';

/**
 * Returns documents that contain a specific prefix in a provided field.
 * 
 * @see https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-prefix-query.html
 */
export interface PrefixQuery {
    prefix: {
        [field: string]: string | PrefixQueryOptions;
    };
}

export interface PrefixQueryOptions extends RewriteOption {
    /** Beginning characters of terms you wish to find in the provided `<field>.` */
    value: string;
}
