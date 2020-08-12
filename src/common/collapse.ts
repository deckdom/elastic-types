import { SortingOption } from './sorting';

export interface Collapse {
    field: string;
    inner_hits?: InnerHit | InnerHit[];
    max_concurrent_group_searches?: number;
}

export interface InnerHit {
    name: string;
    size: number;
    collapse?: Collapse;
    sort?: string | string[] | SortingOption | SortingOption[];
}
