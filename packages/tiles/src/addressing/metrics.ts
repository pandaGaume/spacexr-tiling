export enum CellCoordinateReference {
    Center = 0,
    NorthWest = 1,
    NorthEast = 2,
    SouthWest = 3,
    SouthEast = 4,
}

export interface ICartesian2 {
    x: number;
    y: number;
}

export interface IGeographic2 {
    latitude: number;
    longitude: number;
}

/**
 * Describes the addressing, resolution and valid LOD range of a tile source.
 *
 * This is the renderer-neutral counterpart of SpaceXR `ITileMetrics`. Angles
 * are expressed in degrees and sizes in pixels or metres as documented by
 * each method.
 */
export interface ITileMetrics {
    readonly minLOD: number;
    readonly maxLOD: number;
    readonly minLatitude: number;
    readonly maxLatitude: number;
    readonly minLongitude: number;
    readonly maxLongitude: number;
    readonly tileSize: number;
    readonly cellSize: number;
    readonly cellCoordinateReference: CellCoordinateReference;
    readonly overlap: number;

    mapSize(levelOfDetail: number): number;
    mapScale(latitudeDegrees: number, levelOfDetail: number, pixelsPerUnit: number): number;
    groundResolution(latitudeDegrees: number, levelOfDetail: number): number;

    getLatLonToTileXY(latitudeDegrees: number, longitudeDegrees: number, levelOfDetail: number): ICartesian2;
    getTileXYToLatLon(x: number, y: number, levelOfDetail: number): IGeographic2;
    getLatLonToPointXY(latitudeDegrees: number, longitudeDegrees: number, levelOfDetail: number): ICartesian2;
    getPointXYToLatLon(x: number, y: number, levelOfDetail: number): IGeographic2;
    getTileXYToPointXY(x: number, y: number): ICartesian2;
    getPointXYToTileXY(x: number, y: number): ICartesian2;
}
