// @ts-check
import camelcase from "camelcase";
import { resolvePlugins } from "./plugins";

// Import components from *.vue files
const componentSpecs = import.meta.glob("@/components/**/*.vue", { eager: true, import: "default" });
const pluginComponentSpecs = resolvePlugins(import.meta.glob("@plugins/**/*.vue", { eager: true, import: "default" }));

// Helper
const IGNORED_PATH_SEGMENTS = ["common", "components"];
function filenameToComponentName(filename) {
    return camelcase(
        filename
            .split("/")
            .filter((_, i) => i > 2)
            .filter(s => s && !IGNORED_PATH_SEGMENTS.includes(s))
            .map(s => s.replace(".vue", ""))
            .join("-"),
        { pascalCase: true }
    );
}

// Helper
function resolveComponents(spec) {
    return Object.entries(spec).reduce((list, [name, module]) => {
        name = module?.name || filenameToComponentName(name);
        return { ...list, [name]: module };
    }, {});
}

// Build components
const components = resolveComponents(componentSpecs);

// Build plugin components
const plugins = resolveComponents(pluginComponentSpecs);

// Export all components
export default { ...components, ...plugins };
