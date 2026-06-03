# remote-templat

Template-repo til Bimo-Nexus remote micro frontends. Klones af `bnx generate remote` (fra `@bimo-dk/nexus-cli`), som derefter substituerer `__REMOTE_NAME__` og `__REMOTE_ROUTE__` placeholders med rigtige værdier.

## Brug (via CLI)

```bash
bnx generate remote
# → prompt for remote name (camelCase) + route path (kebab-case)
# → CLI kloner dette repo til ./<name>/ og substituerer placeholders
```

## Placeholders i template

| Placeholder | Substitueres med | Findes i |
|---|---|---|
| `__REMOTE_NAME__` | camelCase remote-navn (fx `checkout`) | `package.json`, `federation.config.json`, `angular.json`, `nginx.conf`, alle `src/**/*.ts` der nævner navnet |
| `__REMOTE_ROUTE__` | kebab-case route (fx `checkout`) | `src/app/remote-entry/entry.component.ts` |

## Struktur

Minimal Angular 19 standalone-applikation med Native Federation forberedt:

```
src/
├── index.html, main.ts, bootstrap.ts, styles.scss
└── app/
    ├── app.component.ts (standalone view — kun til standalone-kørsel)
    ├── app.config.ts, app.routes.ts
    └── remote-entry/
        └── entry.component.ts  ← din rigtige kode kommer her (eksponeres som ./RemoteEntry)
```

## Manuel test efter klon

```bash
cd <din-nye-remote>
npm install
npm start
# → http://localhost:8700 viser standalone view
```

For at registrere den hos en kørende Nexus registry:

```bash
BIMO_TOKEN=... bnx publish
```
