<template>
    <i :class="style"></i>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({ icon: String, fill: Boolean });
const style = computed(() => `icon bi bi-${props.icon}${props.fill ? "-fill" : ""}`);
</script>
