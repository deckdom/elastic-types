import { BoolQuery } from './queries/bool';
import { BoostingQuery } from './queries/boosting';
import { ConstantScoreQuery } from './queries/constant-score';
import { DisMaxQuery } from './queries/dis-max';
import { DistanceFeatureQuery } from './queries/distance-feature';
import { ExistsQuery } from './queries/exists';
import { FuzzyQuery } from './queries/fuzzy';
import { GeoBoundingBoxQuery } from './queries/geo-bounding-box';
import { GeoDistanceQuery } from './queries/geo-distance';
import { GeoPolygonQuery } from './queries/geo-polygon';
import { GeoShapeQuery } from './queries/geo-shape';
import { HasChildQuery } from './queries/has-child';
import { HasParentQuery } from './queries/has-parent';
import { IDsQuery } from './queries/ids';
import { IntervalsQuery } from './queries/intervals';
import { MatchQuery } from './queries/match';
import { MatchAllQuery } from './queries/match-all';
import { MatchBooleanPrefixQuery } from './queries/match-bool-prefix';
import { MatchNoneQuery } from './queries/match-none';
import { MatchPhraseQuery } from './queries/match-phrase';
import { MatchPhrasePrefixQuery } from './queries/match-phrase-prefix';
import { MoreLikeThisQuery } from './queries/more-like-this';
import { MultiMatchQuery } from './queries/multi-match';
import { NestedQuery } from './queries/nested';
import { ParentIDQuery } from './queries/parent-id';
import { PrefixQuery } from './queries/prefix';
import { QueryStringQuery } from './queries/query-string';
import { RangeQuery } from './queries/range';
import { RegexpQuery } from './queries/regexp';
import { ScriptQuery } from './queries/script';
import { ScriptScoreQuery } from './queries/script-score';
import { SimpleQueryStringQuery } from './queries/simple-query-string';
import { SpanContainingQuery } from './queries/span-containing';
import { SpanMultiQuery } from './queries/span-multi';
import { SpanNearQuery } from './queries/span-near';
import { SpanTermQuery } from './queries/span-term';
import { SpanWithinQuery } from './queries/span-within';
import { TermQuery } from './queries/term';
import { TermsQuery } from './queries/terms';
import { TermsSetQuery } from './queries/terms-set';
import { TypeQuery } from './queries/type';
import { WildcardQuery } from './queries/wildcard';
import { WrapperQuery } from './queries/wrapper';

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
