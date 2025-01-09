const pluginSpecs = import.meta.glob("@plugins/*/plugin.json", { eager: true, import: "default" });

// Default plugin spec if no 'plugin.json' was found
const DEFAULT_PLUGIN = {};

// Get the plugin for a specific filename
function getPluginByFilename(filename) {
    const pluginId =
        filename
            .split("/")
            .filter((_, i) => i <= 2)
            .join("/") + "/plugin.json";
    return pluginSpecs[pluginId] || DEFAULT_PLUGIN;
}

// Check if plugin for the given filename is enabled
function isFileAvailable(filename) {
    const plugin = getPluginByFilename(filename);
    return plugin.enabled !== false && (!plugin.hostnames || plugin.hostnames.includes(window.location.hostname));
}

// Reduce given import filenames by disabled plugins
export function resolvePlugins(importGlob) {
    const availableFiles = Object.keys(importGlob).filter(isFileAvailable);
    return availableFiles.reduce((result, filename) => ({ ...result, [filename]: importGlob[filename] }), {});
}
