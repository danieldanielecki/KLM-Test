// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
declare const API_KEY_FIREBASE_DEVELOPMENT: string;

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: API_KEY_FIREBASE_DEVELOPMENT,
    authDomain: 'klm-test-dev.firebaseapp.com',
    databaseURL: 'https://klm-test-dev.firebaseio.com',
    projectId: 'klm-test-dev',
    storageBucket: 'klm-test-dev.appspot.com',
    messagingSenderId: '637039707351',
    appId: '1:637039707351:web:f33ec705a16b5135'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
