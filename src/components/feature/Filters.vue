<template>
    <div class="d-flex flex-wrap align-items-center feature-filters">
        <div v-for="feature in filters" :key="feature.component" :class="feature.classname">
            <component :is="feature.component" :feature="feature" v-bind="$props" />
        </div>
    </div>
</template>

<script setup>
import { computed } from "vue";
import featureService from "@/services/feature";
const props = defineProps({ node: String, aggs: Object, filters: Object, context: Object });
const filters = computed(() => featureService.getFeatures("filter", props));
</script>
