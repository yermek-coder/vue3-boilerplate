<template>
    <div @click="callback" class="btn-flex">
        <Icon icon="delete" />
        <span>Delete</span>
    </div>
</template>

<script>
import eventManager from '@/services/event';
import postsManager from '@/services/posts';

export default {
    feature: {
        type: "menu",
        order: 850,
        group: "edit",
        node: "post.item",
    },
    props: ["entity", "context"],
    methods: {
        callback() {
            postsManager.deletePost(this.entity.id).then(() => {
                eventManager.publish("post:deleted", this.entity)
            })
        }
    }
};
</script>
