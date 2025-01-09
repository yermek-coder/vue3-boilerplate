<template>
    <component v-for="feature in features" :key="feature.component" :is="feature.component" :feature="feature" v-bind="$props" />
</template>

<script setup>
import { computed } from "vue";
import featureService from "@/services/feature";
const props = defineProps({ node: String, entity: Object, context: Object });
const features = computed(() => featureService.getFeatures("extension", props));
</script>
