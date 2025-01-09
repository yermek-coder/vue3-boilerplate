<template>
    <div v-darkmode class="m-3 layout-side nav-main">
        <RouterLink to="/" class="d-block my-3">
            <Logo class="text-body mx-auto" style="width: 24px;" />
        </RouterLink>

        <template v-for="(group, index) in navNodesGroups" :key="group.id">
            <div v-if="index" class="border-top my-2"></div>
            <div class="nav nav-pills flex-column">
                <component v-for="feature in group.features" :key="feature.component" :is="feature.component"
                    :feature="feature" v-bind="$props" :class="feature.classname" />
            </div>
        </template>
    </div>
</template>

<script setup>
import { computed } from "vue";
import featureService from "@/services/feature";
const navNodesGroups = computed(() => featureService.getFeatures("nav", { node: "main" }, { grouped: true, defaultGroup: "default" }));
</script>
