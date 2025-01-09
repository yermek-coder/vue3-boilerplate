// @ts-check
import { toBaseName } from "./util";
import { resolvePlugins } from "./plugins";

// Import filters
// @ts-ignore
const filterSpecs = import.meta.glob("@/filters/*.js", { eager: true, import: "default" });
// @ts-ignore
const pluginFilterSpecs = resolvePlugins(import.meta.glob("@plugins/*/filters/*.js", { eager: true, import: "default" }));

// Resolve filters
const filters = Object.entries(filterSpecs).reduce((result, [name, module]) => ({ ...result, [toBaseName(name)]: module }), {});
const pluginFilters = Object.entries(pluginFilterSpecs).reduce((result, [name, module]) => ({ ...result, [toBaseName(name)]: module }), {});

// Export all filters
export default { ...filters, ...pluginFilters };
