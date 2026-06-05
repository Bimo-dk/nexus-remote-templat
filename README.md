# remote-templat (Angular)

The **Angular 19** remote scaffold for Nexus. Cloned by `bnx generate remote --framework angular` (from `@bimo-dk/nexus-cli`), which then substitutes `__REMOTE_NAME__` and `__REMOTE_ROUTE__` placeholders with real values.

Sister templates: [`nexus-remote-templat-vue`](../nexus-remote-templat-vue/) (Vue 3), [`nexus-remote-templat-react`](../nexus-remote-templat-react/) (React 18).

## Usage (via CLI)

```bash
bnx generate remote
# -> prompts for remote name (camelCase) + route path (kebab-case)
# -> CLI clones this repo to ./<name>/ and substitutes placeholders
```

## Placeholders in the template

| Placeholder | Substituted with | Found in |
|---|---|---|
| `__REMOTE_NAME__` | camelCase remote name (e.g. `checkout`) | `package.json`, `federation.config.json`, `angular.json`, `nginx.conf`, any `src/**/*.ts` that mentions the name |
| `__REMOTE_ROUTE__` | kebab-case route (e.g. `checkout`) | `src/app/remote-entry/entry.component.ts` |

## Structure

Minimal Angular 19 standalone application with Native Federation prepared:

```
src/
├── index.html, main.ts, bootstrap.ts, styles.scss
└── app/
    ├── app.component.ts (standalone view — only for standalone runs)
    ├── app.config.ts, app.routes.ts
    └── remote-entry/
        └── entry.component.ts  -> your actual code goes here (exposed as ./RemoteEntry)
```

## Manual test after cloning

```bash
cd <your-new-remote>
npm install
npm start
# -> http://localhost:8700 shows the standalone view
```

To register it with a running Nexus registry:

```bash
NEXUS_TOKEN=... bnx publish
```
