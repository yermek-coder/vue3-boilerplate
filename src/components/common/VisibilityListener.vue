<template></template>

<script setup>
import { onBeforeUnmount } from "vue";

const emit = defineEmits(["visible", "hidden"]);

function changed() {
    emit(document.visibilityState);
}

document.addEventListener("visibilitychange", changed);

onBeforeUnmount(() => document.removeEventListener("visibilitychange", changed));
</script>
