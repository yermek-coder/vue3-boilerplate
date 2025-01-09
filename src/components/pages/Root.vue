<template>
    <div class="pane pane-h">
        <div class="pane-item overflow-auto">
            <NavMain />
        </div>
        <div class="pane-fill">
            <div class="pane">
                <div class="pane-item">
                    <NavTop />
                </div>
                <div class="pane-fill">
                    <RouterView />
                </div>
            </div>
        </div>
        <FeatureExtensions node="root" />
    </div>
</template>

<script>
export default {
    route: { name: "root", path: "", redirect: "/home" }
};
</script>
