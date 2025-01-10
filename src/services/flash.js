import { reactive } from "vue";

class FlashManager {
    constructor() {
        this.state = reactive({
            flashes: []
        });
    }

    show(options) {
        const flash = Object.assign(
            {
                id: new Date().getTime(),
                timeout: 2000,
                type: "success"
            },
            options
        );

        this.state.flashes.push(flash);
        if (!(flash.close || flash.buttons?.length > 0)) {
            setTimeout(() => this.close(flash), flash.timeout);
        }

        return flash;
    }

    close(flash) {
        this.state.flashes.splice(this.state.flashes.indexOf(flash));
    }
}

export default new FlashManager();
