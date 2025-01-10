<template>
    <div @click="outside" :class="[modal.modalClass, modal.animation]" class="modal d-block">
        <div :class="modalWindowClass" class="modal-dialog">
            <component :is="modal.component" @close="close" @dismiss="close" v-bind="modal.props" class="modal-content"></component>
        </div>
    </div>
</template>

<script>
import modalService from "@/services/modal";

export default {
    props: ["modal"],
    methods: {
        close(result, options) {
            if (options?.animation) {
                this.$el.classList.add(options.animation);
            }

            modalService.close(this.modal, result);
        },
        outside(e) {
            if (e.target.matches(".modal") && !this.modal.static) {
                this.close();
            }
        }
    },
    computed: {
        modalWindowClass() {
            return [this.modal.windowClass || "", this.modal.size ? "modal-" + this.modal.size : ""].filter(Boolean).join(" ");
        }
    }
};
</script>
