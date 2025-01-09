export default function (Vue) {
    const globals = Vue.config.globalProperties;

    globals.$working = function (promise, options = {}) {
        return globals.$modal({
            static: options?.static,
            component: "WorkingDialog",
            windowClass: "modal-dialog-centered",
            props: { promise, ...options.props }
        });
    };
}
