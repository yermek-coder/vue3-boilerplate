<template>
    <div>
        <Transition name="anim-modal-backdrop">
            <div v-if="backdropVisible" :style="backdropStyle" class="modal-backdrop"></div>
        </Transition>
        <TransitionGroup name="anim-modal-content">
            <Modal v-for="(modal, index) in state.modals" :key="modal.id" :modal="modal" :style="modalStyle(index)"></Modal>
        </TransitionGroup>
    </div>
</template>

<script>
import modalService from "@/services/modal";

export default {
    props: { options: Object },
    data() {
        return { state: modalService.state, backdropVisible: false };
    },
    computed: {
        backdropStyle() {
            return {
                "z-index": 2045 + (this.options?.backdropBack ? 0 : 10 * (modalService.state.modals.length - 1))
            };
        },
        numModals() {
            return modalService.state.modals.length;
        }
    },
    methods: {
        modalStyle(index) {
            return {
                "z-index": 2050 + 10 * index
            };
        }
    },
    watch: {
        numModals(num) {
            if (this.options?.backdropDelay > 0) {
                clearTimeout(this.to);
                this.to = setTimeout(() => (this.backdropVisible = num > 0), num == 0 ? this.options.backdropDelay : 0);
            } else {
                this.backdropVisible = num > 0;
            }
        }
    },
    mounted() {
        document.addEventListener("keydown", e => {
            if (e.key == "Escape") {
                const top = modalService.state.modals.length > 0 && modalService.state.modals[modalService.state.modals.length - 1];
                if (top && !top.static) {
                    modalService.close(top);
                }
            }
        });
    }
};
</script>
