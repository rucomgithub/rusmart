// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
export const environment = {
  production: false,
  api:'http://10.3.65.243:8080',
  googleAuth:'https://backend-services.ru.ac.th/ru-smart-api/google/authorization',
  studentProfile: 'https://backend-services.ru.ac.th/ru-smart-api/student/profile',
  base_path_cat2: 'http://appsapi.ru.ac.th/NewsRu/NewsJson?c_id=1',
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
