export default {
    mounted(el) {
        setTimeout(() => {
            // Init
            const w = window.innerWidth;
            const h = window.innerHeight;
            const translate = { x: 0, y: 0 };
            const rect = el.getBoundingClientRect();

            // Shift X
            if (rect.left < 0) {
                translate.x = -rect.left;
            } else if (rect.right > w) {
                translate.x = w - rect.right;
            }

            // Shift Y
            if (rect.top < 0) {
                translate.y = -rect.top;
            } else if (rect.bottom > h) {
                translate.y = h - rect.bottom;
            }

            // Apply transform
            if (translate.x != 0.0 || translate.y != 0.0) {
                el.style.transform = `translate(${translate.x}px, ${translate.y}px)`;
            }
        }, 16);
    }
};
