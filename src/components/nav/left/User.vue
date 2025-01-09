<template>
    <RouterLink to="/user" active-class="active" class="nav-link px-2">User</RouterLink>
</template>

<script>
export default {
    feature: { type: "nav", node: "top.left", order: 200, role: "user" }
};
</script>
