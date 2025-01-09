import { resolve } from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import sassGlobImport from "vite-plugin-sass-glob-import";
import plugins from "./plugins";

// Estimate 'ignored paths' for plugin scss
const ignorePaths = plugins.map(plugin => plugin.enabled === false && `../plugins/${plugin.name}/**/*.scss`).filter(Boolean);

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [sassGlobImport({ ignorePaths }), vue()],
    server: {
        port: 3000,
        proxy: {
            '/api': {
                target: 'https://jsonplaceholder.org',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
        }
    },
    resolve: {
        alias: {
            "@": resolve(__dirname, "src"),
            "@plugins": resolve(__dirname, "plugins"),
            // Fix import errors from vite
            "underscore/modules": "underscore"
        }
    }
});
