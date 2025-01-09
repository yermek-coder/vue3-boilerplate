<template>
    <div @click="$emit('dismiss')">
        <div v-for="(group, index) in menuItems">
            <div v-if="index > 0" class="dropdown-divider"></div>
            <component v-for="feature in group.features" :is="feature.component" :feature="feature" v-bind="$props" :class="feature.classname" class="dropdown-item" role="button" />
        </div>
        <NothingFound v-if="menuItems?.length === 0" />
    </div>
</template>

<script setup>
import { computed } from "vue";
import featureService from "@/services/feature";
const props = defineProps({ node: String, entity: Object, context: Object });
const menuItems = computed(() => featureService.getFeatures("menu", props, { grouped: true, defaultGroup: "default" }));
</script>
