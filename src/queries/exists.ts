/**
 * Returns documents that contain an indexed value for a field.
 * An indexed value may not exist for a document’s field due to a variety of reasons:
 * 
 * * The field in the source JSON is null or []
 * * The field has "index" : false set in the mapping
 * * The length of the field value exceeded an ignore_above setting in the mapping
 * * The field value was malformed and ignore_malformed was defined in the mapping
 * 
 * @see https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-exists-query.html
 */
export interface ExistsQuery {
    exists: ExistsQueryOptions;
}

export interface ExistsQueryOptions {
    /**
     * Name of the field you wish to search.
     * While a field is deemed non-existant if the JSON value is `null` or `[]`, these values will indicate the field does exist:
     * 
     * * Empty strings, such as "" or "-"
     * * Arrays containing null and another value, such as [null, "foo"]
     * * A custom null-value, defined in field mapping
     */
    field: string;
}
