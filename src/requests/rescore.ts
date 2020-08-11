import { SearchQuery } from "src/queries";

export interface Rescore {
    window_size?: number;
    query: RescoreQuery;
}

export interface RescoreQuery {
    score_mode?: string;
    rescore_query: SearchQuery;
    query_weight?: number;
    rescore_query_weight?: number;
}
