// @ts-check
import { toBaseName } from "./util";
import { resolvePlugins } from "./plugins";

// Import addons
// @ts-ignore
const addonsSpecs = import.meta.glob("@/addons/*.js", { eager: true, import: "default" });
// @ts-ignore
const pluginAddonsSpecs = resolvePlugins(import.meta.glob("@plugins/*/addons/*.js", { eager: true, import: "default" }));

// Resolve addons
const addons = Object.entries(addonsSpecs).reduce((result, [name, module]) => ({ ...result, [toBaseName(name)]: module }), {});
const pluginAddons = Object.entries(pluginAddonsSpecs).reduce((result, [name, module]) => ({ ...result, [toBaseName(name)]: module }), {});

// Export all addons
export default { ...addons, ...pluginAddons };
