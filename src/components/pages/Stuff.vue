<template>
    <div class="container">
        <h1 class="mt-5 text-light">Stuff path</h1>
    </div>
</template>

<script>
export default {
    route: { name: "stuff", path: "stuff", parent: "root", meta: { auth: true, role: "stuff" } }
};
</script>
