// @ts-check
import { resolve } from "path";
import { existsSync, readFileSync, readdirSync } from "fs";

// Init
const pluginsDir = resolve(__dirname, "plugins");

// Read all plugin.json files and generate plugin list
export default readdirSync(pluginsDir).map(dir => {
    const plugin = { name: dir, enabled: true };
    const filename = resolve(pluginsDir, dir, "plugin.json");
    if (existsSync(filename)) {
        Object.assign(plugin, JSON.parse(readFileSync(filename).toString()));
    }

    return plugin;
});
