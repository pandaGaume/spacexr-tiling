# Tiling schemes in their own repository

Status: accepted on 2026-11-14.

## Context

`3d-tiles-core` holds the 3D Tiles wire model, its codecs and the single runtime, in ECEF. A tiling scheme of a body, the Web Mercator quadtree or the equi-angular cube, is not 3D Tiles: it addresses tiles on a surface, connects them and places them on a body. It had grown inside `3d-tiles-core` as the package `@spacexr/tiles`.

The framework migration retired the cube from the generic packages. The cube is still needed: by `terrain-core`, which builds terrain on it, by `spacexr-tile-service`, which produces Moon and Mars datasets on it, and by `spacexr-explorer`. Putting it in `terrain-core` would make the tile service depend on terrain, and putting it in `3d-tiles-core` would mix a tiling scheme into 3D Tiles.

## Decision

`spacexr-tiling` owns the package `@spacexr/tiles`, under the same name, so that imports do not change. It holds every tiling scheme and the generic addressing they share:

| Entry point                   | Contents                                                                                                                                                                                                                  |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@spacexr/tiles/addressing`   | Tile addresses with an optional `face`, keys, quadkeys, parents and children, neighbours and edge rotations, `ITileTopology` and `flatTileTopology`, `ITileSurface`, `ITileMetrics`, `Tile` and raster registration. |
| `@spacexr/tiles/surface`      | `ReferenceSurface` with triaxial radii and radial heights, planetocentric directions.                                                                                                                                    |
| `@spacexr/tiles/pyramid`      | `TilePyramid`, `ResidentTiles`, the area of a tile in an ancestor.                                                                                                                                                         |
| `@spacexr/tiles/sources`      | URL templates, the HTTP tile client, `WebTileSource`.                                                                                                                                                                       |
| `@spacexr/tiles/mercator`     | `WebMercatorTileMetrics` and `WebMercatorTileSurface`.                                                                                                                                                                      |
| `@spacexr/tiles/cube`         | `CubeFace`, the equi-angular mapping, neighbours across faces, `CUBE_TILE_TOPOLOGY`, `CubeTileSurface`, the geometric error of a cube tile, and the dataset descriptor of a tile service on the cube.                   |
| `@spacexr/tiles/reprojection` | Source projections (geographic, polar stereographic, Web Mercator), source tile matrices, WMTS capabilities, and the resampling of sources toward a tiling scheme.                                                         |

The root entry point `@spacexr/tiles` exports all of them, as it did before the move.

What stays out of `spacexr-tiling`:

- **The 3D Tiles bridges.** A Web Mercator or cube tiling presented as an implicit 3D Tiles tileset in ECEF (`web-map.ts`, `cube-source.ts` of the runtime) depends on both 3D Tiles and a scheme. They go to `terrain-core`, next to the grid sources that use them.
- **Map projections of a CRS.** Web Mercator, UTM, transverse Mercator and Lambert stay in `@spacexr/geodesy`. The equi-angular cube mapping is not a CRS: it defines a tiling scheme and stays here.
- **Provider fixtures.** Tests run on synthetic fixtures only. Real capabilities of a provider, such as Moon Trek, belong to the tile service that consumes it.
- **Body constants.** Radii and other physical parameters are explicit inputs, from `spacexr-celestial` or an application. Tests may use body values as examples.

## Dependencies

```text
@spacexr/geodesy
   |
   v
spacexr-tiling (@spacexr/tiles)
   |
   +--> 3d-tiles-core (core, runtime): the runtime reads the generic addressing and topology only, for the quadtree balance
   |
   +--> terrain-core (raster, dem, grid, grid sources and terrain tilings, the 3D Tiles bridges)
   |
   +--> spacexr-tile-service, spacexr-explorer
```

`spacexr-tiling` depends on `@spacexr/geodesy` only. It never imports `3d-tiles-core`, `terrain-core` or a renderer.

## Migration

1. Create `@spacexr/tiles` here from `3d-tiles-core` main, split the Web Mercator scheme into `mercator`, and add `cube` and the cube resampling from the cube branch, adapted to the main layout, with synthetic fixtures.
2. Point `3d-tiles-core`, `terrain-core`, `spacexr-rendering`, `spacexr-tile-service` and `spacexr-explorer` at `../spacexr-tiling/packages/tiles`.
3. Move the runtime bridges `web-map.ts` and `cube-source.ts` to `terrain-core`; remove `packages/tiles` from `3d-tiles-core`.
4. Move `terrain-tiling` and the grid sources from `spacexr-rendering` to `terrain-core`, after separating the pure geometry of `gpu/grid-shapes.ts` from its Babylon texture pool. Their settings go to a configuration of `terrain-core`.
5. In `spacexr-rendering`, keep the GPU terrain engine with radial heights, optimised for its targets. Body specialisations (Moon, Mars, body datasets and objects) leave it, for a body composition or the application.

## Consequences

- The rule "cube implementations do not belong to the active generic packages" of `3d-tiles-core` and `terrain-core` becomes: tiling schemes, the cube included, live in `spacexr-tiling`.
- `@spacexr/tiles/addressing` no longer exports `WebMercatorTileMetrics` and `WebMercatorTileSurface`; they move to `@spacexr/tiles/mercator`. The root entry point still exports them.
- Publication of `@spacexr/tiles` moves to this repository and needs its own trusted publishing.
