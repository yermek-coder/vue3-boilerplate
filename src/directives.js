// @ts-check
import { toBaseName } from "./util";
import { resolvePlugins } from "./plugins";

// Import directives
// @ts-ignore
const directiveSpecs = import.meta.glob("@/directives/*.js", { eager: true, import: "default" });
// @ts-ignore
const pluginDirectiveSpecs = resolvePlugins(import.meta.glob("@plugins/*/directives/*.js", { eager: true, import: "default" }));

// Resolve directives
const directives = Object.entries(directiveSpecs).reduce((result, [name, module]) => ({ ...result, [toBaseName(name)]: module }), {});
const pluginDirectives = Object.entries(pluginDirectiveSpecs).reduce((result, [name, module]) => ({ ...result, [toBaseName(name)]: module }), {});

// Export all directives
export default { ...directives, ...pluginDirectives };
