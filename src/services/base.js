// @ts-check
import { reactive } from "vue";
import { merge } from "@/util";

// Default storage
const STORAGE = window.localStorage;

// Properties
export const user = reactive({ id: "", email: "", roles: [] });
export const connection = reactive({ token: "" });

/**
 *
 */
export async function init() {
    // Load from storage
    load();
}

export async function login(role) {
    // Save state
    connection.token = "test-token";

    user.id = "user-123";
    user.email = "test@email.com";
    user.roles = [role]

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
    return user?.roles?.includes(role);
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
    connection.token = STORAGE.getItem("token") || "";
}

// Helper
function save() {
    // Save state to storage
    persist("user", user);
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
