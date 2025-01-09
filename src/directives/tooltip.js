import { generate } from "short-uuid";
import { createPopper } from "@popperjs/core";

// Constants
const PLACEMENTS = ["left", "right", "bottom", "top"];

// Init
let container = null;

export default {
    mounted(el, binding) {
        // Init
        const tooltipId = "tooltip-" + generate();
        el.setAttribute("data-tooltip-id", tooltipId);

        // Create root
        if (!container) {
            container = document.createElement("div");
            container.classList.add("tooltip-container");
            document.body.append(container);
        }

        // Create tooltip
        const tooltip = document.createElement("div");
        tooltip.id = tooltipId;
        tooltip.classList.add("tooltip");
        tooltip.classList.add("bs-tooltip-auto");
        tooltip.innerHTML = `<div class="tooltip-arrow"></div><div class="tooltip-inner">${binding.value}</div>`;
        // tooltip.style.opacity = "1";
        container.append(tooltip);

        // Create popper instance
        const placement = PLACEMENTS.find(p => !!binding.modifiers[p]) || "bottom";
        const popperInstance = createPopper(el, tooltip, { placement });

        // Show tooltip
        function show() {
            tooltip.classList.toggle("show", true);
            popperInstance.update();
        }

        // Hide tooltip
        function hide() {
            tooltip.classList.toggle("show", false);
        }

        // Register event listeners
        ["mouseenter", "focus"].forEach(event => el.addEventListener(event, show));
        ["mouseleave", "blur"].forEach(event => el.addEventListener(event, hide));
    },
    beforeUnmount(el) {
        // Remove popup
        const tooltipId = el.getAttribute("data-tooltip-id");
        document.querySelector(`#${tooltipId}`).remove();
    },
    updated(el, binding) {
        // Update text
        const tooltipEl = document.querySelector(`#${el.getAttribute("data-tooltip-id")} .tooltip-inner`);
        if (tooltipEl) {
            tooltipEl.innerHTML = binding.value;
        }
    }
};
