import type { ICartesian3 } from "@spacexr/geodesy";

import type { ITileAddress } from "./tile-address";

export type { ICartesian3 };

/** How tiles share one shape: tiles of the same `key` are the same shape turned about the `Z` axis by `rotation`. */
export interface ITileShapeFrame {
    /** Identifies the shape among the tiles of a surface. */
    readonly key: string;
    /** Angle about the `Z` axis from the frame of the shape to the body-fixed frame, in radians. */
    readonly rotation: number;
}

/**
 * Places the tiles of a pyramid on a body: the part of a tiling scheme that geometry needs. Positions are Cartesian,
 * in metres, in the body-fixed frame. Tile coordinates `s` and `t` run in `[0, 1]`, `s` along the tile `x` axis and
 * `t` along its `y` axis.
 */
export interface ITileSurface {
    /**
     * Point of a tile at a height above the reference surface, along {@link up}.
     *
     * @param height - Height in metres. Defaults to 0.
     * @param target - Receives the point.
     * @throws RangeError When the address does not belong to the surface.
     */
    point(address: ITileAddress, s: number, t: number, height?: number, target?: ICartesian3): ICartesian3;

    /**
     * Unit vector along which heights move a point of the tile.
     *
     * @param target - Receives the vector.
     * @throws RangeError When the address does not belong to the surface.
     */
    up(address: ITileAddress, s: number, t: number, target?: ICartesian3): ICartesian3;

    /**
     * Shape shared by a tile with others.
     *
     * @throws RangeError When the address does not belong to the surface.
     */
    shape(address: ITileAddress): ITileShapeFrame;
}
