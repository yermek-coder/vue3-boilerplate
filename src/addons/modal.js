import modalService from "@/services/modal";

export default {
    install(Vue) {
        Vue.config.globalProperties.$modal = function (options) {
            return modalService.open(options);
        };
    }
};
