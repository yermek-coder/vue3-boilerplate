// @ts-check
import { createApp } from "vue";
import { createPinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";
import bootstrap from "./lib/v-bootstrap.mjs";
import dropin from "./lib/dropin";
import confirm from "./lib/confirm";
import { routes, routeList } from "./routes";
import { getHttpParam } from "./util";
import { user, logout, userHasRole, init } from "./services/base";
import components from "./components";
import directives from "./directives";
import services from "./services";
import filters from "./filters";
import addons from "./addons";
import App from "./App.vue"

// Start
async function start() {
    // Create App
    const app = createApp(App);
    const globals = app.config.globalProperties;

    // Register components
    Object.entries(components).forEach(([name, component]) => app.component(name, component));

    // Register directives
    Object.entries(directives).forEach(([name, directive]) => app.directive(name, directive));

    // Register additional global properties / functions
    globals.$routeList = routeList;
    globals.$components = components;
    Object.entries(filters).forEach(([name, filter]) => (globals["$" + name] = filter));

    // Create router
    const router = createRouter({ history: createWebHistory(), routes });

    // Route security
    router.beforeEach(to => {
        // Apply styling based on root node
        if (to?.matched?.length > 0) {
            document.documentElement.setAttribute("data-app-node", to.matched[0].name);
        }

        // Security
        if ((to.meta?.auth === true && !user.email) || (to.meta?.role && !userHasRole("" + to.meta.role))) {
            return { name: "login", query: { r: encodeURIComponent(to.fullPath) } };
        }
    });

    // Watch for auth events
    document.addEventListener("api/unauthorized", () => user.id && logout());
    document.addEventListener("auth", () => router.push(user.email ? getHttpParam("r") || { name: "public" } : { name: "login" }));

    // Configure app
    app.use(router);
    app.use(bootstrap);
    app.use(dropin);
    app.use(confirm);
    app.use(createPinia());

    // Configure error handler
    app.config.errorHandler = error => {
        console.error(error);
        app.config.globalProperties.$flash({ message: error || "Error", type: "danger" });
    };

    // Registering addons
    Object.entries(addons).forEach(([_, addon]) => app.use(addon));

    // Dependecy injection of global properties into services
    Object.entries(services).forEach(([_, module]) => {
        Object.values(module).forEach(service => {
            Object.keys(service)
                .filter(attr => attr.indexOf("$") === 0 && globals[attr])
                .forEach(attr => (service[attr] = globals[attr]));
        });
    });

    // Provide global properties
    Object.keys(globals).forEach(name => app.provide(name, globals[name]));

    // Init base
    try {
        await init();
    } catch (err) {
        // FIXME Handle that?
        console.log("Could not init base", err);
    }


    // Mount
    app.mount("#app");
}

// Bootup
start();
