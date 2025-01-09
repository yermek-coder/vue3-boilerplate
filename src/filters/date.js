import { config, user } from "@/services/base";

const SIZES = {
    default: { day: "2-digit", month: "2-digit", year: "2-digit" },
    date_month_short: { day: "2-digit", month: "short", year: "numeric" },
    sm: { day: "2-digit", month: "2-digit" },
    full: { dateStyle: "medium", timeStyle: "short" },
    date_hr: { weekday: "short", month: "long", day: "2-digit", year: "numeric" },
    day_number_only: { day: "2-digit" },
    date_hr_short: { weekday: "long", day: "2-digit", month: "2-digit", year: "2-digit" }
};

export default function (date, size = "default") {
    if (size === "year_aware_date") {
        size = new Date(date).getFullYear() === new Date().getFullYear() ? "sm" : "default";
    }

    return date ? new Date(date).toLocaleString("de-DE" || config.locale || navigator.language, { ...(SIZES[size] || SIZES.default) }) : "";
}
