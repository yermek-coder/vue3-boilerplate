import Dialog from "./Dialog.vue";

export default {
    install(Vue) {
        Vue.component("ConfirmDialog", Dialog);
        Vue.config.globalProperties.$confirm = function (config) {
            return Vue.config.globalProperties.$modal({ component: "ConfirmDialog", props: { ...config } });
        };
    }
};
