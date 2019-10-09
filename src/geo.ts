export type GeoPosition = string | [number, number] | {
    lat: number;
    lon: number;
};

export type GeoShapeType = 'point'
    | 'linestring'
    | 'polygon'
    | 'multipoint'
    | 'multilinestring'
    | 'multipolyon'
    | 'geometrycollection'
    | 'envelope'
    | 'circle';

export interface GeoVertex {
    top_left?: GeoPosition;
    topLeft?: GeoPosition;
    bottom_right?: GeoPosition;
    bottomRight?: GeoPosition;
    top_right?: GeoPosition;
    topRight?: GeoPosition;
    bottom_left?: GeoPosition;
    bottomLeft?: GeoPosition;
    wkt?: string;
    top?: number;
    left?: number;
    bottom?: number;
    right?: number;
}

export interface ValidationMethodOption {
    /**
     * Set to `IGNORE_MALFORMED` to accept geo points with invalid latitude or longitude,
     * set to `COERCE` to also try to infer correct latitude or longitude.
     * Default is `STRICT`.
     */
    validation_method?: 'IGNORE_MALFORMED' | 'COERCE' |'STRICT';
}
