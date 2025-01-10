import flashService from "@/services/flash";

export default {
    install(Vue) {
        // Flashes
        Vue.config.globalProperties.$flash = function (options) {
            return flashService.show(options);
        };
    }
};
