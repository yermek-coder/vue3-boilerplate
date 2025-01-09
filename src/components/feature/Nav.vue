<template>
    <div class="feature-nav">
        <component v-for="feature in navNodes" :key="feature.component" :is="feature.component" :feature="feature" v-bind="$props" :class="feature.classname" />
    </div>
</template>

<script setup>
import { computed } from "vue";
import featureService from "@/services/feature";
const props = defineProps({ node: String, entity: Object });
const navNodes = computed(() => featureService.getFeatures("nav", props));
</script>
