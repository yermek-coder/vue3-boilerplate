<template>
    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <div v-for="feature in navNodes" :key="feature.component" class="nav-item">
            <component :is="feature.component" :feature="feature" v-bind="$props" :class="feature.classname"
                class="nav-item" />
        </div>
    </ul>
</template>

<script setup>
import { computed } from "vue";
import featureService from "@/services/feature";
const props = defineProps({ node: String, entity: Object });
const navNodes = computed(() => featureService.getFeatures("nav", props));
</script>
