<template>
    <div class="d-flex flex-nowrap align-items-center feature-actionsrow">
        <component v-for="feature in actionGroups" :key="feature.component" :is="feature.component" :feature="feature" v-bind="$props" :class="feature.classname" />
    </div>
</template>

<script setup>
import { computed } from "vue";
import featureService from "@/services/feature";
const props = defineProps({ node: String, entity: Object, context: Object, size: String });
const actionGroups = computed(() => featureService.getFeatures("action", props));
</script>
