import { uuid } from "short-uuid";
import { ref } from "vue";

// State
export const dropins = ref([]);

// Helper
function estimateZIndex() {
    return (
        100 +
        (Array.from(document.querySelectorAll(".modal, .dropdown-menu.show"))
            .map(el => parseInt(window.getComputedStyle(el).zIndex || "0"))
            .sort()
            .pop() || 0)
    );
}

/**
 * @param {HTMLElement | MouseEvent} elOrEvent
 * @param {*} dropin
 */
export function openDropin(elOrEvent, dropin) {
    // Init pos and z index
    let pos = {};
    if (elOrEvent instanceof Event) {
        pos = {
            zIndex: estimateZIndex(),
            left: elOrEvent.x + "px",
            top: elOrEvent.y + "px"
        };
    } else {
        const rect = elOrEvent.getBoundingClientRect();
        pos = {
            zIndex: estimateZIndex(),
            top: rect.bottom + "px",
            [dropin.placement || "left"]: (dropin.placement == "right" ? window.innerWidth - rect.right : rect.x) + "px"
        };

        // FIXME: Use popper
        if (dropin.placement == "bottom") {
            pos.left = rect.x + "px";
            pos.top = "initial";
            pos.bottom = window.innerHeight - rect.top + "px";
        }
    }

    dropin = { id: uuid(), pos, ...dropin };

    const promise = new Promise(resolve => (dropin.resolve = resolve));

    dropins.value.push(dropin);
    return promise;
}

export function closeAllDropins() {
    dropins.value.forEach(dropin => dropin.resolve());
    dropins.value.length = 0;
}

export function closeDropin(dropin, payload) {
    dropin.resolve(payload);
    const index = dropins.value.indexOf(dropin);
    if (index >= 0) {
        dropins.value.splice(index, 1);
    }
}

export function dismissDropin(dropin) {
    closeDropin(dropin);
}

export function recalcDropinPosition(dropin) {
    const el = document.getElementById(`dropin-${dropin.id}`);
    if (el) {
        setTimeout(() => {
            const diff = window.innerHeight - el.getBoundingClientRect().bottom;
            if (diff < 0) {
                dropin.pos.top = `${parseInt(dropin.pos.top.replace("px", "")) + diff}px`;
            }
        });
    }
}
