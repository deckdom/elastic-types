import { SpanNearQuery } from './span-near';

export interface SpanFieldMaskingQuery {
    field_masking_span: SpanFieldMaskingQueryOptions;
}

export interface SpanFieldMaskingQueryOptions {
    query: SpanNearQuery;
    field: string;
}
