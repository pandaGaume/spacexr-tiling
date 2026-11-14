# SpaceXR Tiling

Tiling schemes of a body for the SpaceXR framework, in the package [`@spacexr/tiles`](packages/tiles/README.md): tile addressing and topology, the Web Mercator and equi-angular cube schemes, reference surfaces, pyramids, HTTP sources and source reprojection.

The 3D Tiles runtime (`3d-tiles-core`), terrain (`terrain-core`), the tile service and the applications read the same schemes from here. This repository depends on `@spacexr/geodesy` only. See [the architecture decision](docs/architecture.md).

```bash
npm ci
npm run check
```
