// @ts-check
import components from "./components";

// Init routes
export const routeList = Object.values(components)
    .filter(component => component.route)
    .map(component => ({ component, ...component.route }));

// Prepare router hierarchy
routeList.forEach(route => {
    if (route.parent) {
        const parent = routeList.find(current => current.name == route.parent);
        if (parent) {
            parent.children = parent.children || [];
            parent.children.push(route);
        }
    }
});

// Root nodes
export const routes = routeList.filter(route => !route.parent);
