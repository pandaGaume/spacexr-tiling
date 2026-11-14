import type { ITileAddress } from "../addressing/tile-address";
import type { ReferenceSurface } from "../surface/reference-surface";
import { cubeTileDirection } from "./cube-mapping";

const CORNERS: ReadonlyArray<readonly [number, number]> = [
    [0, 0],
    [1, 0],
    [1, 1],
    [0, 1],
];

/**
 * Geometric error of a terrain tile of the cube index: the longest of its four edges, measured as the chord between
 * its corners on the reference surface, divided by the cells of a tile side. It follows the distortion of the cube
 * instead of assuming one size per level.
 *
 * @param tileSize - Cells per tile side.
 * @throws RangeError When the address is invalid or the tile size is not positive.
 */
export function cubeTileGeometricError(address: ITileAddress, surface: ReferenceSurface, tileSize: number): number {
    if (!(tileSize > 0)) throw new RangeError("The tile size must be positive.");
    const points = CORNERS.map(([s, t]) => surface.point(cubeTileDirection(address, s, t)));
    let longest = 0;
    for (let index = 0; index < 4; index++) {
        const a = points[index]!;
        const b = points[(index + 1) % 4]!;
        longest = Math.max(longest, Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z));
    }
    return longest / tileSize;
}
