<template>
    <button type="button" class="btn" :class="[`btn-${button.style ?? 'light'} btn-${button.size ?? 'md'}`]">
        <span v-if="button.label">{{ button.label }}</span>
        <i v-if="button.icon" :class="`icon bi bi-${button.icon}`"></i>
    </button>
</template>

<script>
export default {
    props: ["button"]
};
</script>
