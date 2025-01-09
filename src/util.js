export function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function clone(obj) {
    if (obj === null || obj === undefined) {
        return obj;
    }

    return JSON.parse(JSON.stringify(obj));
}

export function capitalize(str) {
    if (typeof str !== "string") return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getHttpParam(key) {
    const val = new URL(window.location).searchParams.get(key);
    return val ? decodeURIComponent(val) : null;
}

export function toBaseName(name) {
    return (name || "").split("/").pop().split(".").toSpliced(-1).join(".");
}

export function toggle(array, value) {
    if (Array.isArray(array)) {
        if (array.includes(value)) {
            return array.filter(item => item != value);
        } else {
            return [...array, value];
        }
    }
}

export function merge(dest, obj) {
    Object.keys(dest).forEach(key => delete dest[key]);
    return Object.assign(dest, obj);
}

export function linksToHrefs(text) {
    const options = {
        attributes: {
            target: "_blank"
        },
        defaultProtocol: "https",
        validate: {
            url: value => /^(https?:\/\/)|^(www\.\S+\.\S{2,5})/.test(value)
        }
    };

    return linkifyHtml(text, options);
}

export async function loadLib(src, cb) {
    // Already loaded
    if (cb()) {
        return;
    }

    // Create script
    if (!document.querySelector(`script[src='${src}']`)) {
        const el = document.createElement("script");
        el.src = src;
        document.head.append(el);
    }

    // Wait for lib
    return new Promise(resolve => {
        const ival = setInterval(() => {
            if (cb()) {
                clearInterval(ival);
                resolve(true);
            }
        }, 100);
    });
}

export function objectToHttpParams(obj, prefix = null) {
    if (!obj) {
        return "";
    }

    const list = [];
    for (let entry in obj) {
        if (obj.hasOwnProperty(entry)) {
            const p = prefix ? prefix + "_" + entry : entry;
            const e = obj[entry];
            list.push(e !== null && typeof e === "object" ? objectToHttpParams(e, p) : encodeURIComponent(p) + "=" + encodeURIComponent(e));
        }
    }

    return list.join("&");
}

export const seq = function (factories) {
    return factories.reduce((prev, fn) => {
        if (!(prev instanceof Promise)) {
            logger.error("INVALID PROMISE %s", prev);
        }

        return prev.then(fn);
    }, Promise.resolve());
};
