import { ScriptObject } from '../common';

/**
 * Like the `sampler` aggregation this is a filtering aggregation
 * used to limit any sub aggregations' processing to a sample
 * of the top-scoring documents. The `diversified_sampler` aggregation
 * adds the ability to limit the number of matches that share
 * a common value such as an "author".
 * 
 * @see https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-diversified-sampler-aggregation.html
 */
export interface DiversifiedSamplerAggregation {
    diversified_sampler: DiversifiedSamplerAggregationOptions;
}

export interface DiversifiedSamplerAggregationOptions {
    field: string;
    /**
     * The `shard_size` parameter limits how many top-scoring documents
     * are collected in the sample processed on each shard.
     * The default value is `100`.
     */
    shard_size?: number;
    /**
     * The `max_docs_per_value` is an optional parameter and limits how many
     * documents are permitted per choice of de-duplicating value.
     * The default setting is "1".
     */
    max_docs_per_value?: string;
    /**
     * The optional `execution_hint` setting can influence the management of
     * the values used for de-duplication. Each option will hold up
     * to `shard_size` values in memory while performing de-duplication but
     * the type of value held can be controlled as follows:
     * 
     * * hold field values directly (`map`)
     * * hold ordinals of the field as determined by the Lucene index (`global_ordinals`)
     * * hold hashes of the field values - with potential for hash collisions (`bytes_hash`)
     * 
     * The default setting is to use `global_ordinals` if this information is
     * available from the Lucene index and reverting to `map` if not.
     * The `bytes_hash` setting may prove faster in some cases but introduces
     * the possibility of false positives in de-duplication logic due to the
     * possibility of hash collisions. Please note that Elasticsearch will
     * ignore the choice of execution hint if it is not applicable and that
     * there is no backward compatibility guarantee on these hints.
     */
    execution_hint?: 'map' | 'global_ordinals' | 'bytes_hash';
    script?: ScriptObject;
}