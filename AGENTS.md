# SpaceXR Tiling

Read this file before modifying the repository.

Owns `@spacexr/tiles` in `packages/tiles`: the tiling schemes of a body and the generic addressing they share. See [the architecture decision](docs/architecture.md).

## Boundaries

- Depend on `@spacexr/geodesy` only. Never import `3d-tiles-core`, `terrain-core`, a renderer or a body catalogue.
- Map projections of a CRS (Web Mercator, UTM, Lambert) belong to `@spacexr/geodesy`. A tiling scheme, such as the equi-angular cube, belongs here.
- Presenting a scheme as a 3D Tiles tileset is a bridge, and belongs to `terrain-core`.
- Physical radii and geodetic systems are explicit inputs. Tests may use body values as examples.
- Tests use synthetic fixtures only. Captures of a provider, such as WMTS capabilities, belong to the service that consumes it.

## Conventions

- TypeScript interfaces use an uppercase `I` prefix.
- Document units, reference frames and raster registration.
- Run `npm ci` then `npm run check` from this root.
- No npm publication without an explicit request. Trusted publishing must be configured for this repository first.
- Never use the em dash character.
