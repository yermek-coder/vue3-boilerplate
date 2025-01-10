// Close all dropdown menus
document.addEventListener(
    "click",
    e => {
        if (e.target.closest(".dropdown-menu-static") === null) {
            document.querySelectorAll(".dropdown-menu-managed").forEach(el => {
                if (el.classList.contains("show")) {
                    setTimeout(() => {
                        el.closest(".dropdown")?.dispatchEvent(new CustomEvent("dropdowntoggle", { detail: { show: false } }));
                        el.classList.remove("show");
                        el.classList.add("hide");
                        el.style.transform = "";
                    });
                }
            });
        }
    },
    true
);

// Find scrollable parent element
function findScrollContainer(el) {
    if (!el) {
        return undefined;
    }

    let parent = el.parentElement;
    while (parent) {
        const { overflow } = window.getComputedStyle(parent);
        if (overflow.split(" ").every(o => o === "auto" || o === "scroll")) {
            return parent;
        }

        parent = parent.parentElement;
    }

    return document.documentElement;
}

function placeDropdownMenu(menuEl) {
    const containerEl = findScrollContainer(menuEl);
    const savedOpacity = menuEl.style.opacity;
    menuEl.style.opacity = 0.01;
    requestAnimationFrame(() => {
        const transforms = [];
        const menuElRect = menuEl.getBoundingClientRect();
        const containerElRect = containerEl.getBoundingClientRect();
        if (menuElRect.bottom > containerElRect.bottom) {
            menuEl.style.top = "initial";
            transforms.push(`translateY(${containerElRect.bottom - menuElRect.bottom}px)`);
        }

        if (menuElRect.left < containerElRect.left) {
            transforms.push(`translateX(${containerElRect.left - menuElRect.left}px)`);
        } else if (menuElRect.right > containerElRect.right) {
            transforms.push(`translateX(${containerElRect.right - menuElRect.right}px)`);
        }

        menuEl.classList.toggle("transformed", transforms.length !== 0)
        if (transforms.length) {
            menuEl.style.transform = transforms.join(" ");
        }

        menuEl.style.opacity = savedOpacity;
    });
}


export default {
    install(Vue) {
        // Directives
        Vue.directive("dropdown", {
            mounted: function (el, binding) {
                // Add class
                el.classList.add("dropdown");
                if (binding.modifiers.fixed) {
                    el.classList.add("dropdown-fixed");
                }

                // Handle toggle click
                const menuEl = el.querySelector(".dropdown-menu");
                if (binding.modifiers.static) {
                    menuEl.classList.add("dropdown-menu-static");
                }

                if (binding.modifiers.right) {
                    menuEl.classList.add("dropdown-menu-right");
                }

                const toggleEl = el.querySelector(".dropdown-toggle");
                if (menuEl && toggleEl) {
                    toggleEl.addEventListener("click", () => {
                        if (!menuEl.classList.contains("show")) {
                            menuEl.classList.add("show");
                            menuEl.classList.remove("hide");
                            if (binding.modifiers.fixed) {
                                const rect = el.getBoundingClientRect();
                                menuEl.style.top = rect.bottom + "px";
                                if (menuEl.classList.contains("dropdown-menu-right")) {
                                    menuEl.style.right = window.innerWidth - rect.right + "px";
                                } else {
                                    menuEl.style.left = rect.left + "px";
                                }
                            } else {
                                placeDropdownMenu(menuEl);
                            }

                            el.dispatchEvent(new CustomEvent("dropdowntoggle", { detail: { show: true } }));
                        }
                    });
                }
            }
        });
        Vue.directive("dropdown-menu", function (el) {
            el.classList.add("dropdown-menu", "dropdown-menu-managed");
        });
        Vue.directive("dropdown-item", function (el) {
            el.classList.add("dropdown-item");
        });
        Vue.directive("dropdown-toggle", function (el) {
            el.classList.add("dropdown-toggle");
        });
    }
};
