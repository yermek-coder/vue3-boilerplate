<template>
    <div>
        <div v-if="title" class="modal-header">
            <div class="modal-title" v-html="title" />
        </div>
        <div class="modal-body text-center text-muted py-5 my-5">
            <div>
                <span class="spinner-border"></span>
            </div>
            <div v-if="text" class="mt-3" v-html="text"></div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["promise", "title", "text"],
    mounted() {
        this.promise.catch(err => this.$emit("dismiss", err)).then(result => this.$emit("close", result));
    }
};
</script>
