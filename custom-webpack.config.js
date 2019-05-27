const webpack = require('webpack');

const isCiBuild = !!process.env.CI; // Indicate that this is a CI environment.

// Secrets declaration with empty string initialization.
let apiKeyFirebaseDevelopment = '';
let apiKeyFirebaseProduction = '';
let apiKeyKlm = '';

// Use different source of secrets for CI and different for development.
if (isCiBuild) {
  apiKeyFirebaseDevelopment = process.env.API_KEY_FIREBASE_DEVELOPMENT;
  apiKeyFirebaseProduction = process.env.API_KEY_FIREBASE_PRODUCTION;
  apiKeyKlm = process.env.API_KEY_KLM;
} else {
  const config = require('./config/secrets');
  apiKeyFirebaseDevelopment = config.API_KEY_FIREBASE_DEVELOPMENT;
  apiKeyFirebaseProduction = config.API_KEY_FIREBASE_PRODUCTION;
  apiKeyKlm = config.API_KEY_KLM;
}

// Export the secrets.
module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      API_KEY_FIREBASE_DEVELOPMENT: JSON.stringify(apiKeyFirebaseDevelopment),
      API_KEY_FIREBASE_PRODUCTION: JSON.stringify(apiKeyFirebaseProduction),
      API_KEY_KLM: JSON.stringify(apiKeyKlm)
    })
  ]
};
