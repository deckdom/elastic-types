export interface BasicScriptObject {
    lang?: string;
    params?: {
        [paramName: string]: any;
    };
}

export interface InlineScriptObject extends BasicScriptObject {
    /** An inline script is specified `source`. */
    source: string;
}

export interface StoredScriptObject extends BasicScriptObject {
    /** 
     * A stored script is specified id and is retrieved from the cluster state.
     * 
     * @see https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-scripting-using.html#modules-scripting-stored-scripts
     */
    id: string;
}