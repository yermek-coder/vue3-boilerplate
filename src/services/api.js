// @ts-check
import { connection } from "./base";

// API Service
class API {
    url(path = "") {
        return `${connection.url || ""}${path.indexOf("/") !== 0 ? "/api/" : ""}${path}`;
    }

    get(path, config = null) {
        return this.exec("get", path, null, config);
    }

    put(path, body = null, config = null) {
        return this.exec("put", path, body, config);
    }

    post(path, body = null, config = null) {
        return this.exec("post", path, body, config);
    }

    remove(path, config = null) {
        return this.exec("delete", path, null, config);
    }

    exec(method, path, body = null, config = {}) {
        // Init headers
        const headers = { "x-jwt": connection.token };

        // Check upload type
        if (body && typeof body == "object" && !(body instanceof FormData)) {
            body = JSON.stringify(body);
            headers["Content-Type"] = "application/json";
        }

        // Execute fetch
        return fetch(this.url(path), {
            body,
            method,
            ...config,
            credentials: "include",
            headers: { ...headers, ...config?.headers }
        }).then(async res => {
            if (res.status == 401) {
                document.dispatchEvent(new Event("api/unauthorized"));
                throw "Unauthorized";
            } else if (res.status >= 400) {
                let payload = { message: await res.text() };
                try {
                    payload = JSON.parse(payload.message);
                } catch (e) { }

                throw { status: res.status, statusText: res.statusText, ...payload };
            }

            // Parse json
            const text = await res.text();
            try {
                return JSON.parse(text);
            } catch (err) {
                return text;
            }
        });
    }
}

export default new API();
