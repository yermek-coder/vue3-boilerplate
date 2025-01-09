import { isString } from "underscore";
import { config } from "@/services/base";

export default function (date, options = { timeZone: null, timeStyle: "short", hour12: true }) {
    if (date && isString(date) && date.length === 5) {
        date = new Date().toISOString().substring(0, 10) + "T" + date + ":00.000Z";
    }

    return date ? new Date(date).toLocaleTimeString(config.locale || navigator.language, options) : "";
}
