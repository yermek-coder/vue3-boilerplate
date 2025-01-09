<template>
    <div v-if="options.length" class="d-flex flex-wrap align-items-center gap-2 feature-options">
        <div v-for="feature in options" :key="feature.component" :class="feature.classname">
            <component :is="feature.component" :feature="feature" v-bind="$props" />
        </div>
    </div>
</template>

<script setup>
import { computed } from "vue";
import featureService from "@/services/feature";
const props = defineProps({ node: String, options: Object, context: Object });
const options = computed(() => featureService.getFeatures("option", props));
</script>
