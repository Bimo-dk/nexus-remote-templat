import { initFederation } from '@angular-architects/native-federation';

initFederation()
  .catch((err) => console.error('[__REMOTE_NAME__] Federation init failed:', err))
  .then(() => import('./bootstrap'))
  .catch((err) => console.error('[__REMOTE_NAME__] Bootstrap failed:', err));
