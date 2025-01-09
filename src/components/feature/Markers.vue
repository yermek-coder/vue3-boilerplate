<template>
    <div class="d-flex flex-shrink-0 flex-wrap align-items-center gap-2 feature-markers">
        <component v-for="feature in markers" :key="feature.component" :is="feature.component" :feature="feature" v-bind="$props" :class="feature.classname" />
    </div>
</template>

<script setup>
import { computed } from "vue";
import featureService from "@/services/feature";
const props = defineProps({ node: String, entity: Object, context: Object });
const markers = computed(() => featureService.getFeatures("marker", props));
</script>
