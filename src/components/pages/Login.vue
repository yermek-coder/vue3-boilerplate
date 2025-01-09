<template>
    <div class="pane pane-h app-pane">
        <div class="pane-fill">
            <div class="pane app-pane align-items-center justify-content-center">
                <div class="card global-card shadow my-5">
                    <div class="card-body p-5">
                        <button @click="loginAsUser" class="btn btn-primary w-100 mb-3">Login as user</button>
                        <button @click="loginAsStuff" class="btn btn-primary w-100">Login as stuff</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    route: { name: "login", path: "/login", meta: { auth: false } }
};
</script>

<script setup>
import { login } from '@/services/base'

function loginAsUser() {
    login('user')
}

function loginAsStuff() {
    login('stuff')
}
</script>

<style>
.global-card {
    width: 100%;
    max-width: 500px;
    color: var(--bs-light);
    border-color: rgba(255, 255, 255, 0.075);
    background-color: var(--bs-gray-900);

    h4 {
        margin-top: 0;
        font-size: 1.2rem;
    }
}
</style>