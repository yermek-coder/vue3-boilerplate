// @ts-check
import { reactive } from "vue";
import { merge } from "@/util";

// Default storage
const STORAGE = window.localStorage;

// Properties
export const user = reactive({ id: "", email: "", groups: [] });
export const connection = reactive({ url: "", token: "" });
export const config = reactive({ roles: [], user: {} });

/**
 *
 */
export async function init() {
    // Load from storage
    load();
}

/**
 * @param {String} email
 * @param {String} password
 * @param {String} instance
 */
export async function login(email, password, instance = null) {
    // Save state
    connection.token = "test-token";

    // Persist state
    save();

    // Dispatch auth event
    document.dispatchEvent(new Event("auth"));
}

/**
 *
 */
export async function logout() {
    // Clean up state
    merge(user, {});

    connection.url = "";
    connection.token = "";

    // Persist state
    save();

    // Dispatch auth event
    document.dispatchEvent(new Event("auth"));
}

/**
 * @param {String} role
 * @returns
 */
export function userHasRole(role) {
    return config?.roles?.includes(role);
}

// Merge updated user data
export function mergeUser(model) {
    merge(user, model);
    return user;
}

// Helper
function load() {
    // Load from storage
    merge(user, JSON.parse(STORAGE.getItem("user") || "{}"));
    merge(config, JSON.parse(STORAGE.getItem("config") || "{}"));
    connection.url = STORAGE.getItem("url") || "";
    connection.token = STORAGE.getItem("token") || "";
}

// Helper
function save() {
    // Save state to storage
    persist("user", user);
    persist("config", config);
    persist("url", connection.url);
    persist("token", connection.token);
}

// Helper
function persist(key, value) {
    if (value) {
        STORAGE.setItem(key, typeof value == "string" ? value : JSON.stringify(value));
    } else {
        STORAGE.removeItem(key);
    }
}
