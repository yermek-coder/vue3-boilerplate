<template>
    <RouterLink to="/public" active-class="active" class="nav-link px-2">Public</RouterLink>
</template>

<script>
export default {
    feature: { type: "nav", node: "top.left", order: 100 }
};
</script>
