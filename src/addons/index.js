import { openDropin } from "@/services/dropin";

export default {
    install(Vue) {
        Vue.config.globalProperties.$dropin = openDropin;
    }
};
