<template>
    <div class="d-flex flex-nowrap align-items-center flex-wrap gap-2 feature-actions">
        <div v-for="group in actionGroups" :key="group.id" :class="'btn-group-' + (size || '')" class="btn-group">
            <component v-for="feature in group.features" :key="feature.component" :is="feature.component" :feature="feature" v-bind="$props" :class="feature.classname" />
        </div>
    </div>
</template>

<script setup>
import { computed } from "vue";
import featureService from "@/services/feature";
const props = defineProps({ node: String, entity: Object, context: Object, size: String });
const actionGroups = computed(() => featureService.getFeatures("action", props, { grouped: true }));
</script>
