<template>
    <div class="dropins d-print-none">
        <TransitionGroup name="anim-dropin">
            <component v-placeinwindow v-for="dropin in dropins" :id="`dropin-${dropin.id}`" :key="dropin.id" :style="dropin.pos" @mousedown.stop :is="dropin.component" v-bind="dropin.props" @keydown.escape="dismissDropin(dropin)" @close="closeDropin(dropin, $event)" @dismiss="dismissDropin(dropin)" @recalcPosition="recalcDropinPosition(dropin)" class="dropdown-menu dropin" />
        </TransitionGroup>
    </div>
</template>

<script setup>
import { dropins, closeAllDropins, closeDropin, dismissDropin, recalcDropinPosition } from "./dropin";
document.addEventListener("mousedown", closeAllDropins);
</script>
