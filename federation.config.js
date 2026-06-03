const { withNativeFederation } = require('@angular-architects/native-federation/config');
const json = require('./federation.config.json');

module.exports = withNativeFederation({
  name: json.name,
  exposes: json.exposes,
  shared: json.shared,
  skip: ['rxjs/ajax', 'rxjs/fetch', 'rxjs/testing', 'rxjs/webSocket'],
});
