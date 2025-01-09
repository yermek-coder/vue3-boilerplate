<template>
    <div>
        <div class="modal-header">
            <div class="modal-title">{{ post.title }}</div>
        </div>
        <div class="modal-body">
            <p>{{ post.content }}</p>
        </div>
        <div class="modal-footer"></div>
    </div>
</template>

<script setup>
defineProps(["post"])
</script>