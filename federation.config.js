const { withNativeFederation, shareAll } = require('@angular-architects/native-federation/config');
const json = require('./federation.config.json');

module.exports = withNativeFederation({
  name: json.name,
  exposes: json.exposes,

  // shareAll auto-discovers every dependency from package.json (including
  // sub-path imports like rxjs/operators, @angular/core/primitives/signals,
  // @angular/common/http) and emits a separate chunk per entry. Without
  // this an Angular remote loaded from a Vue or React host fails with
  // `Unable to resolve specifier 'rxjs/operators'` because the host's
  // import map only sees the top-level entries the remote declared.
  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
    ...(json.shared || {}),
  },

  skip: ['rxjs/ajax', 'rxjs/fetch', 'rxjs/testing', 'rxjs/webSocket'],
});
