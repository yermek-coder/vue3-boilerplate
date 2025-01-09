<template>
    <ul class="list-group list-group-flush">
        <li @click="openPost(post)" v-for="post in posts" :key="post.id"
            class="list-group-item list-group-item-action btn-flex">
            <div class="flex-fill">{{ post.title }}</div>
            <div>{{ post.category }}</div>
            <FeatureActionMenu @click.stop node="post.item" :entity="post" />
        </li>
    </ul>
</template>

<script setup>
import eventManager from "@/services/event";
import postsManager from "@/services/posts"
import { inject, onBeforeUnmount, ref } from "vue";

const $modal = inject("$modal")

const posts = ref([])

postsManager.getPosts().then(list => posts.value = list)

const listener = eventManager.on("post:deleted", onPostDelete)
onBeforeUnmount(listener);

function onPostDelete({ payload }) {
    posts.value = posts.value.filter(post => post.id !== payload.id)
}

function openPost(post) {
    $modal({ component: "PostsDialog", props: { post } })
}
</script>