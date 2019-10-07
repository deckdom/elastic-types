import { TermLevelQuery } from './queries/term-level';
import { FullTextQuery } from './queries/full-text';

export { TermLevelQuery, FullTextQuery };
export { CompoundQuery } from './queries/compounds';
export { SearchQuery }  from './queries/search-query';

export type LeafQuery = TermLevelQuery | FullTextQuery;
