# ERP Frontend (React + TypeScript + Vite)

A React 19 + TypeScript application built with Vite 7, Material UI, Redux Toolkit (with redux-persist), React Router v7, and Axios.

## Tech Stack
- React 19, TypeScript 5
- Vite 7 (dev server, build, preview)
- MUI v7 (`@mui/material`, `@mui/icons-material`, `@mui/x-date-pickers`)
- Redux Toolkit + React-Redux + redux-persist
- React Router v7 (lazy loaded routes)
- Axios (typed API client)
- Prettier + ESLint (formatting/linting)

## Quick Start
Prerequisites:
- Node.js ≥ 18
- npm

Install:
```bash
npm install
```

Run (dev mode, port 5050):
```bash
npm run dev
```

Build (typecheck + production build):
```bash
npm run build
```

Preview production build (port 5050):
```bash
npm run preview
```

## Scripts
- `dev`: Vite dev server (`--mode=dev`)
- `build`: `tsc -b` then `vite build --mode=prod`
- `preview`: Preview `dist/`
- `lint`: Prettier write + ESLint on the repo
- `format`: Prettier write
- `prepare`: Sets up Husky (run once: `npm run prepare`)

## Environment
Vite loads env files named `.env`, `.env.local`, `.env.dev`, `.env.prod`, etc. Only variables prefixed with `VITE_` are exposed to the client.

Recommended:
```
# .env.example
VITE_API_BASE_URL=https://api.example.com
```

- Build version is auto-injected at build time as `import.meta.env.VITE_BUILD_VERSION`.

## Project Structure (key paths)
```
src/
  App.tsx
  main.tsx
  index.css
  theme/
    theme.ts
  routes/
    index.tsx
  constants/
    index.ts
    api-endpoints.ts
    local-storage-keys.ts
  services/
    ApiService.ts
  store/
    index.ts
    rootReducer.ts
    persistedReducer.ts
  common/
    atoms|molecules|... (reusable UI)
  presentation/
    pages/
      404/
      SalesLeads/
```

## Routing
Routes are lazy loaded for better initial load:
```ts
// src/routes/index.tsx
import { Route, Routes } from "react-router";
import { lazy } from "react";
import { ROUTES } from "../constants";

const NotFoundPage = lazy(() => import("../presentation/pages/404"));
const SalesLeads = lazy(() => import("../presentation/pages/SalesLeads"));

export default function AllRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.SALES_LEADS} element={<SalesLeads />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
```

## Store & Persistence
- Redux store is persisted using `redux-persist` to `localStorage`.
- Currently, only the `login` slice is whitelisted.

```ts
// src/main.tsx
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { persistor, store } from "./store";

<PersistGate loading={null} persistor={persistor}>
  <App />
</PersistGate>
```

```ts
// src/store/persistedReducer.ts
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./rootReducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["login"],
};

export default persistReducer(persistConfig, rootReducer);
```

## Theming & UI
- MUI theme is provided via `ThemeProvider`.
- Global resets via `CssBaseline`.
- Reusable UI lives under `src/common`.

```ts
// src/main.tsx
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme/theme";

<ThemeProvider theme={theme}>
  {/* app */}
</ThemeProvider>
```

## API Client
A small Axios wrapper lives in `src/services/ApiService.ts`. It:
- Sets `Content-Type: application/json`
- Adds `Authorization: Bearer <token>` from `localStorage['token']`
- On 403, clears token and redirects to `ROUTES.LOGIN`

Usage:
```ts
import APIService from "@/services/ApiService";

const api = new APIService(import.meta.env.VITE_API_BASE_URL);

// GET
const user = await api.get<User>("/users/me");

// POST
await api.post<LoginResponse>("/auth/login", { email, password });
```

If you use a different storage key for token, update `src/constants/local-storage-keys.ts`.

## Formatting & Linting
- Prettier config: `.prettierrc.json`
- ESLint config: `eslint.config.js`
- Run locally:
```bash
npm run format
npm run lint
```

Optionally enable Git hooks:
```bash
npm run prepare
# then commit to trigger lint-staged (see package.json "lint-staged")
```

## Build & Deploy
- `npm run build` outputs to `dist/`
- Serve `dist/` with any static server or CDN
- Dev/preview server uses port `5050` (see `vite.config.ts`)

## Performance Notes
- Routes are already lazy loaded via `React.lazy` + `Suspense`.
- Consider manual vendor chunking and bundle analysis (e.g., rollup-plugin-visualizer) if the app grows.
- Prefer ESM, single-function imports, and tree-shakeable libs.

## Troubleshooting
- Stale persisted state? Clear `localStorage` key `persist:root` or call `persistor.purge()`.
- 403 loops? Ensure token in `localStorage['token']` and API CORS/credentials are correct.
- Env not applied? Prefix with `VITE_` and restart dev server.

## License
Private project. All rights reserved.
```
