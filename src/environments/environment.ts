// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  MAP_PROJECTION : 'EPSG:3857',
  MAP_CENTER_LONLAT : [11.4184,55.9740],
  ZOOM_DEFAULT : 7
};
