<template>
    <div @click.prevent.stop="hot = true" v-dropdown :class="'feature-actionmenu-' + props.size" class="feature-actionmenu">
        <slot>
            <button ref="menuButton" v-dropdown-toggle class="btn btn-outline-secondary feature-actionmenu-btn hover-action"><Icon icon="three-dots" /></button>
        </slot>
        <div v-dropdown-menu :class="{ 'dropdown-menu-right': menualign == 'right' }">
            <div v-for="(group, index) in menuItems">
                <div v-if="index > 0" class="dropdown-divider"></div>
                <component v-for="feature in group.features" :is="feature.component" :feature="feature" v-bind="$props" :class="feature.classname" class="dropdown-item" role="button" />
            </div>
            <NothingFound v-if="menuItems?.length === 0" />
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";
import featureService from "@/services/feature";
const props = defineProps({ node: String, entity: Object, context: Object, size: String, menualign: { type: String, default: "right" } });

const hot = ref(false);
const menuItems = computed(() => (hot.value ? featureService.getFeatures("menu", props, { grouped: true, defaultGroup: "default" }) : []));

const menuButton = ref();
function trigger() {
    menuButton.value.click();
}

defineExpose({ trigger });
</script>

<style>
.feature-actionmenu .feature-actionmenu-btn {
    border: 0;
}

.feature-actionmenu-sm .feature-actionmenu-btn {
    padding-top: 1px;
    padding-bottom: 1px;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    line-height: 1rem;
}
</style>
