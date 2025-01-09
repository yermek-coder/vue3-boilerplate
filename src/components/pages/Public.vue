<template>
    <div class="container pane">
        <h1 class="pane-item mt-5 text-light">Unprotected path</h1>
        <div class="pane-fill overflow-auto">
            <PostsList />
        </div>
    </div>
</template>

<script>
export default {
    route: { name: "public", path: "public", parent: "root" }
};
</script>
