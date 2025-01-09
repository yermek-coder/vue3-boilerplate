export default {
    mounted(el, bind) {
        if (!document.documentElement.classList.contains("flag-mode-light")) {
            el.setAttribute("data-bs-theme", bind.value === false ? "light" : "dark");
        }
    }
};
