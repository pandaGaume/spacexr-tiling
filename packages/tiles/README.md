# @spacexr/tiles

Renderer-neutral tiling schemes of a body: tile addressing and topology, the Web Mercator and equi-angular cube schemes, reference surfaces, on-demand pyramids, URL templates, HTTP sources and the reprojection of sources toward a scheme. The package has no renderer, no body catalogue and no provider preset.

## Configure a source

The application supplies its `GeodeticSystem`, normally constructed from the ellipsoid selected in `spacexr-celestial`. No reference body is selected implicitly.

```ts
import type { GeodeticSystem } from "@spacexr/geodesy";
import { WebMercatorTileMetrics, WebTileSource } from "@spacexr/tiles";

export function createSource(system: GeodeticSystem, urlTemplate: string) {
    return new WebTileSource({
        id: "application-source",
        urlTemplate,
        metrics: new WebMercatorTileMetrics({ minLOD: 0, maxLOD: 18 }, system),
        registration: "area",
    });
}
```

## Entry points

| Entry point    | Contents                                                                                                                   |
| -------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `addressing`   | Addresses with an optional root `face`, neighbours, edge rotations, `ITileTopology`, `ITileSurface`, `ITileMetrics`, `Tile`. |
| `surface`      | `ReferenceSurface` with triaxial radii and radial heights, planetocentric directions.                                       |
| `mercator`     | `WebMercatorTileMetrics` and `WebMercatorTileSurface`: one root, geodetic heights.                                          |
| `cube`         | The equi-angular cube: faces, mapping, neighbours across faces, `CUBE_TILE_TOPOLOGY`, `CubeTileSurface`, dataset descriptor. |
| `pyramid`      | `TilePyramid`, `ResidentTiles` and ancestor areas.                                                                         |
| `sources`      | URL templates, `TileHttpClient`, `WebTileSource`.                                                                          |
| `reprojection` | Source projections, source tile matrices, WMTS capabilities and the resampling of sources toward the cube.                 |

The root entry point exports all of them. Physical radii and geodetic systems are explicit inputs. Raster registration is always declared: `area` describes pixel areas, `point` describes shared-edge samples. The 3D Tiles runtime composes these primitives with its own wire model; this package never imports it.

See [the architecture decision](../../docs/architecture.md).
