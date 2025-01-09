<template>
    <RouterLink to="/stuff" active-class="active" class="nav-link px-2">Stuff</RouterLink>
</template>

<script>
export default {
    feature: { type: "nav", node: "top.left", order: 300, role: "stuff" }
};
</script>
