import Dropins from "./Dropins.vue";
import { openDropin } from "./dropin";

export default {
    install(Vue) {
        Vue.config.globalProperties.$dropin = openDropin;
        Vue.component("Dropins", Dropins);
    }
};
