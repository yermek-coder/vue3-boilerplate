<template>
    <div>
        <div v-if="title" class="modal-header">
            <div class="modal-title">{{ $i18n(title) }}</div>
        </div>
        <div class="modal-body">{{ $i18n(message) }}</div>
        <div class="modal-footer">
            <button @click="click(btn)" v-for="btn in computedButtons" :key="btn.value" type="button" :class="btn.classes">
                {{ $i18n(btn.title) }}
            </button>
        </div>
    </div>
</template>

<script>
const PREDEFINED_BUTTONS = {
    ok: {
        value: true,
        title: "ok",
        style: "primary"
    },
    yes: {
        value: true,
        title: "yes",
        style: "primary"
    },
    no: {
        value: false,
        title: "no",
        style: "primary"
    },
    cancel: {
        dismiss: true,
        title: "cancel"
    },
    close: {
        dismiss: true,
        title: "close"
    }
};

export default {
    props: ["title", "message", "buttons"],
    computed: {
        computedButtons() {
            return (this.buttons || []).map(button => {
                const btn = typeof button == "string" ? PREDEFINED_BUTTONS[button] : { ...button };
                btn.classes = btn.style ? "btn btn-" + btn.style : "btn btn-secondary";
                return btn;
            });
        }
    },
    methods: {
        click(btn) {
            if (btn.dismiss) {
                this.$emit("dismiss");
            } else {
                this.$emit("close", btn.value);
            }
        }
    }
};
</script>
