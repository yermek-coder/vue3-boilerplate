<template>
    <div class="container">
        <h1 class="mt-5 text-light">User path</h1>
    </div>
</template>

<script>
export default {
    route: { name: "user", path: "user", parent: "root", meta: { auth: true } }
};
</script>
