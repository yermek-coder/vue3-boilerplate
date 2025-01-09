<template>
    <div>
        <button @click="logout" class="btn btn-secondary" v-if="me.email">Logout</button>
        <RouterLink to="/login" class="btn btn-secondary" v-else>Login</RouterLink>
    </div>
</template>

<script>
export default {
    feature: { type: "nav", node: "top.right", order: 100 }
};
</script>

<script setup>
import { user as me, logout } from "@/services/base";
</script>
