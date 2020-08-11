import { InlineScriptObject } from 'src/common/scripts';

import { SearchQuery } from '../queries';
import { Collapse } from './collapse';
import { Highlight } from './highlight';
import { Rescore } from './rescore';
import { SortingOption } from './sorting';

interface SharedSearchRequestOptions {
    /**
     * If `true`, the request does not return an error if a wildcard expression
     * or `_all` value retrieves only missing or closed indices.
     * This parameter also applies to index aliases that point to a missing
     * or closed index.
     * 
     * Defaults to `true`.
     */
    allow_no_indices?: boolean;
    /**
     * Indicates if an error should be returned if there is
     * a partial search failure or timeout.
     * 
     * Defaults to `true`. 
     */
    allow_partial_search_results?: boolean;
    /**
     * Defines the analyzer to use for the query string. 
     */
    analyzer?: string;
    /**
     * If `true`, wildcard and prefix queries will also be analyzed.
     * 
     * Defaults to `false`. 
     */
    analyze_wildcard?: boolean;
    /**
     * The number of shard results that should be reduced at once
     * on the coordinating node. This value should be used as a protection
     * mechanism to reduce the memory overhead per search request if the
     * potential number of shards in the request can be large.
     * 
     * Defaults to `512`. 
     */
    batched_reduce_size?: number;
    /**
     * Indicates whether network round-trips should be minimized
     * as part of cross-cluster search requests execution.
     * 
     * Defaults to `true`. 
     */
    ccs_minimize_roundtrips?: boolean;
    /**
     * The default operator for query string query (AND or OR).
     * 
     * Defaults to `OR`. 
     */
    default_operator?: 'AND' | 'OR';
    /**
     * Defines the field to use as default where no field prefix
     * is given in the query string.
     */
    df?: string;
    /**
     * Controls what kind of indices that wildcard expressions can expand to.
     * Valid values are:
     * * `all`: Expand to open and closed indices.
     * * `open`: Expand only to open indices.
     * * `closed`: Expand only to closed indices.
     * * `none`: Wildcard expressions are not accepted.
     * 
     * Defaults to `open`.
     */
    expand_wildcards?: 'all' | 'open' | 'closed' | 'none';
    /**
     * If `true`, returns detailed information about score computation
     * as part of a hit.
     * 
     * Defaults to `false`. 
     */
    explain?: boolean;
    /**
     * Defines the starting offset.
     * 
     * Defaults to `0`.
     */
    from?: number;
    /**
     * If `true`, concrete, expanded or aliased indices
     * will be ignored when throttled.
     * 
     * Defaults to `false`.
     */
    ignore_throttled?: boolean;
    /**
     * If `true`, missing or closed indices are not included
     * in the response.
     * 
     * Defaults to `false`. 
     */
    ignore_unavailable?: boolean;
    /**
     * If `true`, format-based query failures (such as providing text
     * to a numeric field) will be ignored.
     * 
     * Defaults to `false`. 
     */
    lenient?: boolean;
    /**
     * Defines the number of concurrent shard requests per node this search
     * executes concurrently. This value should be used to limit the impact
     * of the search on the cluster in order to limit the number of concurrent
     * shard requests.
     * 
     * Defaults to `5`.
     */
    max_concurrent_shard_requests?: number;
    /**
     * Defines a threshold that enforces a pre-filter roundtrip to prefilter
     * search shards based on query rewriting if the number of shards the
     * search request expands to exceeds the threshold. This filter roundtrip
     * can limit the number of shards significantly if for instance a shard
     * can not match any documents based on it’s rewrite method ie. if date
     * filters are mandatory to match but the shard bounds and
     * the query are disjoint.
     * 
     * Defaults to `128`.
     */
    pre_filter_shard_size?: number;
    /**
     * Specifies the node or shard the operation should be performed on.
     * 
     * Random by default.
     */
    preference?: string;
    /** Query in the Lucene query string syntax. */
    q?: string;
    /**
     * If `true`, request cache will be used for this request.
     * 
     * Defaults to index level settings.
     */
    request_cache?: boolean;
    /**
     * Indicates whether hits.total should be rendered as an integer
     * or an object in the rest search response.
     * 
     * Defaults to `false`.
     */
    rest_total_hits_as_int?: boolean;
    /**
     * Specifies how long a consistent view of the index should
     * be maintained for scrolled search.
     * 
     * @see https://www.elastic.co/guide/en/elasticsearch/reference/current/common-options.html#time-units
     */
    routing?: string;
    /**
     * Defines the type of the search operation.
     * Available options:
     * * `query_then_fetch`
     * * `dfs_query_then_fetch`
     */
    search_type?: 'query_then_fetch' | 'dfs_query_then_fetch';
    /**
     * If true, returns sequence number and primary term of
     * the last modification of each hit.
     */
    seq_no_primary_term?: boolean;
    /**
     * Defines the number of hits to return.
     * 
     * Defaults to `10`.
     */
    size?: number;
    /**
     * Specific `tag` of the request for logging and statistical purposes.
     */
    stats?: string;
    /**
     * A comma-separated list of stored fields to return as part of a hit.
     */
    stored_fields?: string;
    /**
     * Specifies which field to use for suggestions.
     */
    suggest_field?: string;
    /**
     * Specifies suggest mode. Defaults to missing.
     * Available options:
     * * `always`
     * * `missing`
     * * `popular`
     */
    suggest_mode?: 'always' | 'missing' | 'popular';
    /**
     * Defines how many suggestions to return in response.
     */
    suggest_size?: number;
    /**
     * The source text for which the suggestions should be returned.
     */
    suggest_text?: string;
    /**
     * The maximum number of documents to collect for each shard,
     * upon reaching which the query execution will terminate early.
     */
    terminate_after?: number;
    /**
     * Specifies the period of time to wait for a response.
     * If no response is received before the timeout expires,
     * the request fails and returns an error.
     * 
     * Defaults to `30s`.
     * 
     * @see https://www.elastic.co/guide/en/elasticsearch/reference/current/common-options.html#time-units
     */
    timeout?: string;
    /**
     * If `true`, then calculates and returns scores
     * even if they are not used for sorting.
     */
    track_scores?: boolean;
    /**
     * Indicates if the number of documents that match
     * the query should be tracked.
     */
    track_total_hits?: boolean;
    /**
     * Specifies whether aggregation and suggester names should be prefixed
     * by their respective types in the response.
     */
    typed_keys?: boolean;
    /**
     * If `true`, returns document version as part of a hit.
     */
    version?: boolean;
}

/**
 * Returns search hits that match the query defined in the request.
 * 
 * @see https://www.elastic.co/guide/en/elasticsearch/reference/current/search-search.html
 */
export interface SearchRequestParameters extends SharedSearchRequestOptions {
    /**
     * A comma-separated list of <field>:<direction> pairs.
     */
    sort?: string;
    /**
     * `true` or `false` to return the `_source` field or not,
     * or a list of fields to return. 
     */
    _source?: boolean | string[];
    /**
 * A list of fields to exclude from the returned `_source` field.
 */
    _source_excludes?: string[];
    /**
     * A list of fields to extract and return from the `_source` field.
     */
    _source_includes?: string[];
    /**
     * @see https://www.elastic.co/guide/en/elasticsearch/reference/current/search-request-body.html#request-body-search-scroll
     */
    scroll?: string;
    /**
     * A comma-separated list of fields to return as the docvalue
     * representation of a field for each hit. 
     */
    docvalue_fields?: string;
}

/**
 * Returns search hits that match the query defined in the request.
 * 
 * @see https://www.elastic.co/guide/en/elasticsearch/reference/current/search-search.html
 */
export interface SearchRequestBody extends SharedSearchRequestOptions {
    /**
     * Array of wildcard (*) patterns.
     * The request returns doc values for field names matching these patterns
     * in the `hits.fields` property of the response.
     * 
     * You can specify items in the array as a string or object.
     * See Doc value fields.
     */
    docvalue_fields?: (string | { field: string, format?: string })[];
    /**
     * Enables explanation for each hit on how its score was computed.
     */
    explain?: boolean;
    /**
     * Exclude documents which have a `_score` less than
     * the minimum specified in `min_score`.
     */
    min_score?: number;
    /**
     * Defines the search definition using the Query DSL.
     */
    query?: SearchQuery;
    /**
     * A comma-separated list of <field>:<direction> pairs, or sorting
     * option.
     */
    sort?: string | SortingOption | (string | SortingOption)[];
    /**
     * `true` or `false` to return the `_source` field or not,
     * or a list of fields to return. 
     */
    _source?: boolean | string[] | {
        excludes?: string | string[];
        includes?: string | string[];
    };
    collapse?: Collapse;
    highlight?: Highlight;
    rescore?: Rescore | Rescore[];
    indicies_boost?: IndexBoost | IndexBoost[];
    aggs?: any;
    post_filter?: SearchQuery;
    script_fields?: {
        [key: string]: {
            script: InlineScriptObject;
        };
    };
    slice?: {
        field?: string;
        id: number;
        max: number;
    };
    search_after?: (string | number)[];
}

export interface IndexBoost {
    [key: string]: number;
}
