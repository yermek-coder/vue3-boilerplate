<template>
    <div class="pane">
        <div class="pane-item overflow-auto">
            <NavTop />
        </div>
        <div class="pane-fill">
            <RouterView />
        </div>
    </div>
</template>

<script>
export default {
    route: { name: "root", path: "", redirect: "/public" }
};
</script>
