// @ts-check
import { isFunction, isMatch, result } from "underscore";
import { userHasRole } from "./base";

export class FeatureService {
    $components;

    getFeatures(type, query = {}, options = null) {
        // Extract all actions
        const features = this.features
            .filter(feature => {
                // Filter by type
                if (feature.type != type) {
                    return false;
                }

                // Filter by role
                if (feature.role && !userHasRole(feature.role)) {
                    return false;
                }

                // Filter by node
                if (feature.nodes && !feature.nodes.includes(query.node || "default")) {
                    return false;
                }

                // Filter by supports function
                if (feature.supports && !feature.supports(query)) {
                    return false;
                }

                // Okay
                return true;
            })
            .sort((a, b) => (a.order > b.order ? 1 : -1));

        // Grouping
        if (options?.grouped) {
            // Build component groups
            let id = 0;
            return features.reduce((result, item) => {
                item.group = item.group || options.defaultGroup || `group-${++id}`;
                let group = result.find(groupItem => groupItem.id == item.group);
                if (!group) {
                    group = { id: item.group, features: [] };
                    result.push(group);
                }

                group.features.push(item);
                return result;
            }, []);
        }

        // Return list
        return features;
    }

    /**
     * Build feature list
     * @returns Feature List
     */
    #buildFeatures() {
        // Get plain feature list
        let features = Object.entries(this.$components)
            .filter(([_, component]) => !!component.feature)
            .flatMap(([name, component]) => {
                // Init feature
                const feature = result(component, "feature");

                // Build feature declarations
                const classname = `feature feature-${name.toLowerCase()}`;
                if (Array.isArray(feature)) {
                    return feature.map(feature => ({ ...feature, classname, component: name }));
                }

                // Return built feature spec
                return { ...feature, classname, component: name };
            })
            .sort((a, b) => (a.order > b.order ? 1 : -1));

        // Prepare and clean up all features
        features = features.map(feature => {
            // Prepare features
            if (feature.node && typeof feature.node == "string" && !feature.nodes) {
                feature.nodes = [feature.node];
            }

            if (feature.entityType && typeof feature.entityType == "string") {
                feature.entityType = [feature.entityType];
            }

            if (feature.entityTargetType && typeof feature.entityTargetType == "string") {
                feature.entityTargetType = [feature.entityTargetType];
            }

            return feature;
        });

        // Extend features
        features.filter(feature => isFunction(feature.extend)).forEach(feature => feature.extend(features));

        // Return built feature list
        return features;
    }

    // Using feature cache
    get features() {
        this.cachedFeatures = this.cachedFeatures || this.#buildFeatures();
        return this.cachedFeatures;
    }
}

export default new FeatureService();
