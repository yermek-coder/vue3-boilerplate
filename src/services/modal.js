import { reactive } from "vue";

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

export default new ModalManager();
