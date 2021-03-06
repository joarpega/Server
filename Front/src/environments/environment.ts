// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  language: 'es-MX',
};

export const timeout = {
  seconds: 5000
};

export const url = {
  base: 'http://localhost:3000/api/',
};

export const apiUrl = {
  production: false,
  login: '',
  personaje: url.base + 'personaje/',
  luke: url.base + 'personaje/luke',
  han: url.base + 'personaje/han',
  leia: url.base + 'personaje/leia',
  rey: url.base + 'personaje/rey',
  personajes: url.base + 'personajes',
  personajesNombre: url.base + 'personajes?ordenar=nombre',
  personajesPeso: url.base + 'personajes?ordenar=peso',
  residentes: url.base + 'residentes',
};


