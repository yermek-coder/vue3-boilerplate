<template>
    <div class="flashes pe-none">
        <div v-for="flash in flashes" :key="flash.id" class="alert pe-auto" :class="['text-bg-' + (flash.type || 'info')]">
            <div>{{ flash.message }}</div>
            <FlashButton v-for="button in flash.buttons" @click.prevent.stop="callback(flash, button)" :button="button" />
            <FlashButton v-if="!!flash.close" @click.prevent.stop="callback(flash)" :button="flash.close" />
        </div>
    </div>
</template>

<script>
import flashService from "@/services/flash";

export default {
    data() {
        return flashService.state;
    },
    methods: {
        hasButtons(flash) {
            return flash.close === false;
        },
        callback(flash, button) {
            if (button?.callback) {
                button.callback();
            }

            flashService.close(flash);
        }
    }
};
</script>
