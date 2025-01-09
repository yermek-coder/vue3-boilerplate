<template>
    <div class="pane pane-h app-pane">
        <div class="pane-fill">
            <RouterView />
            <Modals :options="{ backdropBack: true, backdropDelay: 150 }" class="modal-container" />
        </div>
        <Flashes />
        <Dropins />
    </div>
</template>
