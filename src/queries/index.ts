export * from './bool';
export * from './boosting';
export * from './common';
export * from './constant-score';
export * from './dis-max';
export * from './distance-feature';
export * from './exists';
export * from './fuzzy';
export * from './geo-bounding-box';
export * from './geo-distance';
export * from './geo-polygon';
export * from './geo-shape';
export * from './has-child';
export * from './has-parent';
export * from './ids';
export * from './intervals';
export * from './match-all';
export * from './match-bool-prefix';
export * from './match-none';
export * from './match-phrase-prefix';
export * from './match-phrase';
export * from './match';
export * from './more-like-this';
export * from './multi-match';
export * from './nested';
export * from './parent-id';
export * from './prefix';
export * from './query-string';
export * from './range';
export * from './regexp';
export * from './script-score';
export * from './script';
export * from './simple-query-string';
export * from './span-containing';
export * from './span-field-masking';
export * from './span-first';
export * from './span-multi';
export * from './span-near';
export * from './span-not';
export * from './span-or';
export * from './span-term';
export * from './span-within';
export * from './term';
export * from './terms-set';
export * from './terms';
export * from './type';
export * from './wildcard';
export * from './wrapper';

import { BoolQuery } from './bool';
import { BoostingQuery } from './boosting';
import { ConstantScoreQuery } from './constant-score';
import { DisMaxQuery } from './dis-max';
import { DistanceFeatureQuery } from './distance-feature';
import { ExistsQuery } from './exists';
import { FuzzyQuery } from './fuzzy';
import { GeoBoundingBoxQuery } from './geo-bounding-box';
import { GeoDistanceQuery } from './geo-distance';
import { GeoPolygonQuery } from './geo-polygon';
import { GeoShapeQuery } from './geo-shape';
import { HasChildQuery } from './has-child';
import { HasParentQuery } from './has-parent';
import { IDsQuery } from './ids';
import { IntervalsQuery } from './intervals';
import { MatchQuery } from './match';
import { MatchAllQuery } from './match-all';
import { MatchBooleanPrefixQuery } from './match-bool-prefix';
import { MatchNoneQuery } from './match-none';
import { MatchPhraseQuery } from './match-phrase';
import { MatchPhrasePrefixQuery } from './match-phrase-prefix';
import { MoreLikeThisQuery } from './more-like-this';
import { MultiMatchQuery } from './multi-match';
import { NestedQuery } from './nested';
import { ParentIDQuery } from './parent-id';
import { PrefixQuery } from './prefix';
import { QueryStringQuery } from './query-string';
import { RangeQuery } from './range';
import { RegexpQuery } from './regexp';
import { ScriptQuery } from './script';
import { ScriptScoreQuery } from './script-score';
import { SimpleQueryStringQuery } from './simple-query-string';
import { SpanContainingQuery } from './span-containing';
import { SpanMultiQuery } from './span-multi';
import { SpanNearQuery } from './span-near';
import { SpanTermQuery } from './span-term';
import { SpanWithinQuery } from './span-within';
import { TermQuery } from './term';
import { TermsQuery } from './terms';
import { TermsSetQuery } from './terms-set';
import { TypeQuery } from './type';
import { WildcardQuery } from './wildcard';
import { WrapperQuery } from './wrapper';

export type CompoundQuery =
    | BoolQuery
    | BoostingQuery
    | ConstantScoreQuery
    | DisMaxQuery;

export type LeafQuery =
    | DistanceFeatureQuery
    | ExistsQuery
    | FuzzyQuery
    | GeoBoundingBoxQuery
    | GeoDistanceQuery
    | GeoPolygonQuery
    | GeoShapeQuery
    | HasChildQuery
    | HasParentQuery
    | IDsQuery
    | IntervalsQuery
    | MatchAllQuery
    | MatchBooleanPrefixQuery
    | MatchNoneQuery
    | MatchPhrasePrefixQuery
    | MatchPhraseQuery
    | MatchQuery
    | MoreLikeThisQuery
    | MultiMatchQuery
    | NestedQuery
    | ParentIDQuery
    | PrefixQuery
    | QueryStringQuery
    | RangeQuery
    | RegexpQuery
    | ScriptScoreQuery
    | ScriptQuery
    | SimpleQueryStringQuery
    | SpanContainingQuery
    | SpanMultiQuery
    | SpanNearQuery
    | SpanTermQuery
    | SpanWithinQuery
    | TermQuery
    | TermsSetQuery
    | TermsQuery
    | TypeQuery
    | WildcardQuery
    | WrapperQuery
    ;

export type SearchQuery = CompoundQuery | LeafQuery;
