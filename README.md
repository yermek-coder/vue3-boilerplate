# Vue 3 Advanced Boilerplate

A Vue 3 starter for applications built around reusable services, component-defined routes, and extensible UI features. Includes a posts demo, promise-based modals, role-aware navigation, and a folder-based plugin system.

## Stack

Vue 3 · Vue Router 4 · Pinia 2 · Vite 6 · Bootstrap 5 · Sass · JavaScript (ES modules)

## Quick start

Use Node.js 22 LTS and npm. Dependencies are pinned through `package-lock.json`.

```sh
git clone https://github.com/yermek-coder/vue3-boilerplate.git
cd vue3-boilerplate
npm ci
npm start
```

Open **http://localhost:3000/public**. Vite may select another port if 3000 is busy; check the terminal output. No environment file or local backend is required for the bundled demo, but the posts page needs access to the external demo API.

Visit `/login` to try the two demo roles, `user` and `stuff` (the spelling used in the code). `/user` requires a signed-in user; `/stuff` also requires the `stuff` role.

> Authentication is a local demo: it stores a hard-coded user and token in `localStorage`. Replace it with backend authentication before using this starter for a real application. Route guards and feature visibility only control the UI; enforce authorization on the server.

## Commands

| Command | Purpose |
| --- | --- |
| `npm start` | Start Vite on port 3000. |
| `npm run dev` | Start Vite with network access enabled (`--host`). |
| `npm run build` | Build into `dist/` and copy `index.html` to `404.html`. |
| `npm run preview` | Serve the build on port 3001 with network access enabled. |

`npm test` is currently a placeholder that exits with an error. No automated test suite is configured.

## Project structure

```text
src/
  components/       Shared UI, pages, navigation, feature renderers, posts demo
  services/         API, authentication state, events, modals, feature discovery
  addons/           Vue installers exposing helpers such as $modal and $flash
  directives/       Autofocus, dark mode, drag-and-drop, tooltips, positioning
  filters/          Date, time, and file-size formatting helpers
  style/            Shared Sass styles
  components.js     Automatic component registration
  routes.js         Route discovery and parent/child hierarchy
  plugins.js        Runtime filtering of plugin modules
  index.js          App setup, dependency injection, and route guards
plugins/            Extensions (includes the stuff-role page and navigation)
plugins.js          Build-time plugin discovery
vite.config.js      Aliases, development server, and API proxy
```

## Add a page

Components under `src/components/**/*.vue` are registered automatically. Export a `route` option to include a page in the router; `parent` refers to another route's name.

For example, create `src/components/pages/Reports.vue`:

```vue
<template>
  <div class="container">
    <h1>Reports</h1>
  </div>
</template>

<script>
export default {
  route: {
    name: "reports",
    path: "reports",
    parent: "root",
    meta: { auth: true, role: "stuff" }
  }
};
</script>
```

This adds `/reports` for the `stuff` role. Omit `role` for any signed-in user, or omit `meta` for a public page. Add navigation separately; see `src/components/nav/` and `plugins/components/nav/` for examples.

## Open a modal

The `$modal` helper accepts a registered component name and props. It returns a promise that resolves with the result passed to `modalService.close()`.

```vue
<script setup>
import { inject } from "vue";

const $modal = inject("$modal");

async function openPost(post) {
  const result = await $modal({
    component: "PostsDialog",
    props: { post }
  });
  return result;
}
</script>
```

`PostsDialog` is registered from `src/components/posts/Dialog.vue`. See `src/services/modal.js` and `src/components/common/Modals.vue` for the close lifecycle.

## Extend menus and actions

Components can export a `feature` option to register themselves with the feature service. Renderers select features by type and node, then apply role and optional `supports(query)` checks.

The posts demo uses this declaration in `src/components/posts/actions/Delete.vue`:

```js
feature: {
  type: "menu",
  order: 850,
  group: "edit",
  node: "post.item"
}
```

The corresponding extension point passes the current post as `entity`:

```vue
<FeatureActionMenu node="post.item" :entity="post" />
```

Use `nodes` to target multiple extension points, `role` to limit visibility, and `supports(query)` for custom conditions. A component can export an array of feature declarations. See `src/services/feature.js` and `src/components/feature/` for available renderers and behavior.

## Plugins

Place extensions under `plugins/<plugin-name>/`. Vue components, services, addons, directives, filters, and styles are discovered by the project's import globs. Matching component or module names can override core registrations, so choose names intentionally.

```text
plugins/my-plugin/
  plugin.json
  components/
  services/
  addons/
  directives/
  filters/
  theme/
  style/
```

An optional `plugin.json` controls availability:

```json
{
  "enabled": true,
  "hostnames": ["localhost", "app.example.com"]
}
```

Omit `hostnames` to allow every hostname. Set `enabled` to `false` to exclude the plugin's modules at runtime and its Sass files from compilation. Hostname filtering applies to runtime module registration, not Sass imports, and is not an access-control boundary. Restart Vite after changing plugin configuration so build-time style filtering is refreshed.

## API configuration

`src/services/api.js` wraps `fetch` and prefixes paths with `/api/`. It sends credentials and the current token in the `x-jwt` header, serializes object bodies as JSON, and dispatches `api/unauthorized` on HTTP 401.

During development, `vite.config.js` proxies `/api/*` to `https://jsonplaceholder.org/*`, removing the `/api` prefix. The posts service calls `GET /api/posts` and `DELETE /api/posts/:id`. The external demo service determines whether writes are supported or persisted.

To connect your backend, change the proxy target and adapt the API and authentication services to its contract. The Vite proxy only runs in development. Production hosting must route `/api/` to a backend, or you must change the API service's base URL.

## Build and deploy

```sh
npm run build
npm run preview
```

Deploy the contents of `dist/`. The router uses HTML5 history, so configure your host to serve `index.html` for application routes such as `/public` and `/user`. The generated `404.html` can help on hosts that support an SPA fallback through a custom 404 page; other hosts require an explicit rewrite rule.

Before deploying a real application, replace demo authentication, configure production API routing, and add tests for your application's behavior.
