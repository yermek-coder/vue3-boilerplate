import { reactive, openBlock, createElementBlock, normalizeClass, createElementVNode, createBlock, resolveDynamicComponent, mergeProps, resolveComponent, createVNode, Transition, withCtx, normalizeStyle, createCommentVNode, TransitionGroup, Fragment, renderList, toDisplayString, withModifiers } from 'vue';

class ModalManager {
    constructor() {
        this.state = reactive({
            modals: []
        });
    }

    open(options) {
        this.state.modals.push(options);
        options.id = new Date().getTime();
        return new Promise(resolve => {
            options.$resolve = resolve;
        });
    }

    close(spec, result = null) {
        const ref = this.find(spec.id || spec);
        if (ref) {
            this.state.modals.splice(this.state.modals.indexOf(ref), 1);
            ref.$resolve(result);
        }
    }

    find(id) {
        return this.state.modals.filter(modal => modal.id === id).pop();
    }
}

var modalService = new ModalManager();

class FlashManager {
    constructor() {
        this.state = reactive({
            flashes: []
        });
    }

    show(options) {
        const flash = Object.assign(
            {
                id: new Date().getTime(),
                timeout: 2000,
                type: "success"
            },
            options
        );

        this.state.flashes.push(flash);
        if (!(flash.close || flash.buttons?.length > 0)) {
            setTimeout(() => this.close(flash), flash.timeout);
        }

        return flash;
    }

    close(flash) {
        this.state.flashes.splice(this.state.flashes.indexOf(flash));
    }
}

var flashService = new FlashManager();

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

        menuEl.classList.toggle("transformed", transforms.length !== 0);
        if (transforms.length) {
            menuEl.style.transform = transforms.join(" ");
        }

        menuEl.style.opacity = savedOpacity;
    });
}

var Dropdown = {
    dropdown: {
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
    },
    dropdownItem: function (el) {
        el.classList.add("dropdown-item");
    },
    dropdownToggle: function (el) {
        el.classList.add("dropdown-toggle");
    },
    dropdownMenu: function (el) {
        el.classList.add("dropdown-menu", "dropdown-menu-managed");
    }
};

var script$3 = {
    props: ["modal"],
    methods: {
        close(result, options) {
            if (options?.animation) {
                this.$el.classList.add(options.animation);
            }

            modalService.close(this.modal, result);
        },
        outside(e) {
            if (e.target.matches(".modal") && !this.modal.static) {
                this.close();
            }
        }
    },
    computed: {
        modalWindowClass() {
            return [this.modal.windowClass || "", this.modal.size ? "modal-" + this.modal.size : ""].filter(Boolean).join(" ");
        }
    }
};

function render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", {
    onClick: _cache[0] || (_cache[0] = (...args) => ($options.outside && $options.outside(...args))),
    class: normalizeClass([[$props.modal.modalClass, $props.modal.animation], "modal d-block"])
  }, [
    createElementVNode("div", {
      class: normalizeClass([$options.modalWindowClass, "modal-dialog"])
    }, [
      (openBlock(), createBlock(resolveDynamicComponent($props.modal.component), mergeProps({
        onClose: $options.close,
        onDismiss: $options.close
      }, $props.modal.props, { class: "modal-content" }), null, 16 /* FULL_PROPS */, ["onClose", "onDismiss"]))
    ], 2 /* CLASS */)
  ], 2 /* CLASS */))
}

script$3.render = render$3;
script$3.__file = "src/components/Modal.vue";

var script$2 = {
    components: { Modal: script$3 },
    props: { options: Object },
    data() {
        return { state: modalService.state, backdropVisible: false };
    },
    computed: {
        backdropStyle() {
            return {
                "z-index": 2045 + (this.options?.backdropBack ? 0 : 10 * (modalService.state.modals.length - 1))
            };
        },
        numModals() {
            return modalService.state.modals.length;
        }
    },
    methods: {
        modalStyle(index) {
            return {
                "z-index": 2050 + 10 * index
            };
        }
    },
    watch: {
        numModals(num) {
            if (this.options?.backdropDelay > 0) {
                clearTimeout(this.to);
                this.to = setTimeout(() => (this.backdropVisible = num > 0), num == 0 ? this.options.backdropDelay : 0);
            } else {
                this.backdropVisible = num > 0;
            }
        }
    },
    mounted() {
        document.addEventListener("keydown", e => {
            if (e.key == "Escape") {
                const top = modalService.state.modals.length > 0 && modalService.state.modals[modalService.state.modals.length - 1];
                if (top && !top.static) {
                    modalService.close(top);
                }
            }
        });
    }
};

function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Modal = resolveComponent("Modal");

  return (openBlock(), createElementBlock("div", null, [
    createVNode(Transition, { name: "anim-modal-backdrop" }, {
      default: withCtx(() => [
        ($data.backdropVisible)
          ? (openBlock(), createElementBlock("div", {
              key: 0,
              style: normalizeStyle($options.backdropStyle),
              class: "modal-backdrop"
            }, null, 4 /* STYLE */))
          : createCommentVNode("v-if", true)
      ]),
      _: 1 /* STABLE */
    }),
    createVNode(TransitionGroup, { name: "anim-modal-content" }, {
      default: withCtx(() => [
        (openBlock(true), createElementBlock(Fragment, null, renderList($data.state.modals, (modal, index) => {
          return (openBlock(), createBlock(_component_Modal, {
            key: modal.id,
            modal: modal,
            style: normalizeStyle($options.modalStyle(index))
          }, null, 8 /* PROPS */, ["modal", "style"]))
        }), 128 /* KEYED_FRAGMENT */))
      ]),
      _: 1 /* STABLE */
    })
  ]))
}

script$2.render = render$2;
script$2.__file = "src/components/Modals.vue";

var script$1 = {
    props: ["button"]
};

const _hoisted_1$1 = { key: 0 };

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("button", {
    type: "button",
    class: normalizeClass(["btn text-nowrap", [`btn-${$props.button.style ?? 'light'} btn-${$props.button.size ?? 'md'}`]])
  }, [
    ($props.button.label)
      ? (openBlock(), createElementBlock("span", _hoisted_1$1, toDisplayString($props.button.label), 1 /* TEXT */))
      : createCommentVNode("v-if", true),
    ($props.button.icon)
      ? (openBlock(), createElementBlock("i", {
          key: 1,
          class: normalizeClass(`icon bi bi-${$props.button.icon}`)
        }, null, 2 /* CLASS */))
      : createCommentVNode("v-if", true)
  ], 2 /* CLASS */))
}

script$1.render = render$1;
script$1.__file = "src/components/FlashButton.vue";

var script = {
    components: { FlashButton: script$1 },
    data() {
        return flashService.state;
    },
    methods: {
        hasButtons(flash) {
            return flash.close === false;
        },
        callback(flash, button) {
            if (button?.callback) {
                button.callback();
            }

            flashService.close(flash);
        }
    }
};

const _hoisted_1 = { class: "flashes pe-none" };
const _hoisted_2 = { class: "d-flex align-items-center gap-2" };
const _hoisted_3 = {
  key: 0,
  class: "spinner-border spinner-border-sm"
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Icon = resolveComponent("Icon");
  const _component_FlashButton = resolveComponent("FlashButton");

  return (openBlock(), createElementBlock("div", _hoisted_1, [
    (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.flashes, (flash) => {
      return (openBlock(), createElementBlock("div", {
        key: flash.id,
        class: normalizeClass(["alert pe-auto", ['text-bg-' + (flash.type || 'info')]])
      }, [
        (flash.icon)
          ? (openBlock(), createBlock(_component_Icon, {
              key: 0,
              icon: flash.icon,
              class: "fs-4"
            }, null, 8 /* PROPS */, ["icon"]))
          : createCommentVNode("v-if", true),
        createElementVNode("div", null, toDisplayString(flash.message), 1 /* TEXT */),
        createElementVNode("div", _hoisted_2, [
          (flash.spinner)
            ? (openBlock(), createElementBlock("span", _hoisted_3))
            : createCommentVNode("v-if", true),
          (openBlock(true), createElementBlock(Fragment, null, renderList(flash.buttons, (button) => {
            return (openBlock(), createBlock(_component_FlashButton, {
              onClick: withModifiers($event => ($options.callback(flash, button)), ["prevent","stop"]),
              button: button
            }, null, 8 /* PROPS */, ["onClick", "button"]))
          }), 256 /* UNKEYED_FRAGMENT */)),
          (!!flash.close)
            ? (openBlock(), createBlock(_component_FlashButton, {
                key: 1,
                onClick: withModifiers($event => ($options.callback(flash)), ["prevent","stop"]),
                button: flash.close
              }, null, 8 /* PROPS */, ["onClick", "button"]))
            : createCommentVNode("v-if", true)
        ])
      ], 2 /* CLASS */))
    }), 128 /* KEYED_FRAGMENT */))
  ]))
}

script.render = render;
script.__file = "src/components/Flashes.vue";

var index = {
    install(Vue) {
        // Modals
        Vue.config.globalProperties.$modal = function (options) {
            return modalService.open(options);
        };

        // Flashes
        Vue.config.globalProperties.$flash = function (options) {
            return flashService.show(options);
        };

        // Directives
        Vue.directive("dropdown", Dropdown.dropdown);
        Vue.directive("dropdown-menu", Dropdown.dropdownMenu);
        Vue.directive("dropdown-item", Dropdown.dropdownItem);
        Vue.directive("dropdown-toggle", Dropdown.dropdownToggle);

        // Components
        Vue.component("Flashes", script);
        Vue.component("Modals", script$2);
    }
};

export { index as default, flashService, modalService, placeDropdownMenu };
