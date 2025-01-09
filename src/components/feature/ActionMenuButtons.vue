<template>
    <div class="feature-actionmenu-buttons">
        <div v-for="group in menuItems" :class="'btn-group-' + size" class="btn-group">
            <component v-for="feature in group.features" :is="feature.component" :feature="feature" v-bind="$props" :class="[feature.classname, btnClass || 'btn-light']" class="btn text-nowrap" role="button" />
        </div>
    </div>
</template>

<script setup>
import { computed } from "vue";
import featureService from "@/services/feature";
const props = defineProps({ node: String, entity: Object, context: Object, size: String, btnClass: String });
const menuItems = computed(() => featureService.getFeatures("menu", props, { grouped: true, defaultGroup: "default" }));
</script>
