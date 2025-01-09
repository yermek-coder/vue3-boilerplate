// @ts-check
import { toBaseName } from "./util";
import { resolvePlugins } from "./plugins";

// Import services
// @ts-ignore
const serviceSpecs = import.meta.glob("@/services/*.js", { eager: true });
// @ts-ignore
const pluginServiceSpecs = resolvePlugins(import.meta.glob("@plugins/*/services/*.js", { eager: true }));

// Resolve services
const services = Object.entries(serviceSpecs).reduce((result, [name, module]) => ({ ...result, [toBaseName(name)]: module }), {});
const pluginServices = Object.entries(pluginServiceSpecs).reduce((result, [name, module]) => ({ ...result, [toBaseName(name)]: module }), {});

// Export all services
export default { ...services, ...pluginServices };
