import { CompoundQuery } from './compounds';
import { FullTextQuery } from './full-text';
import { GeoQuery } from './geo';
import { JoiningQuery } from './joining';
import { TermLevelQuery } from './term-level';

export type SearchQuery = CompoundQuery | FullTextQuery | GeoQuery | JoiningQuery | TermLevelQuery;