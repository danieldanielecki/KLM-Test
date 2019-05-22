declare const API_KEY_FIREBASE_PRODUCTION: string;

export const environment = {
  production: true,
  firebaseConfig: {
    apiKey: API_KEY_FIREBASE_PRODUCTION,
    authDomain: "klm-test-prod.firebaseapp.com",
    databaseURL: "https://klm-test-prod.firebaseio.com",
    projectId: "klm-test-prod",
    storageBucket: "klm-test-prod.appspot.com",
    messagingSenderId: "909361874450",
    appId: "1:909361874450:web:35352039ef01b80d"
  }
};
