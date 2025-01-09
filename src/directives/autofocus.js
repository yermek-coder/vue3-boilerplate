export default {
    mounted(el, binding) {
        if (binding.value === undefined || binding.value) {
            el = el.querySelector("input, textarea, select") || el;
            setTimeout(() => el.focus(), 250);
        }
    }
};
