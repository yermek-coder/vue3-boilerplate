import api from "@/services/api"

class PostsManager {
    getPosts() {
        return api.get('posts')
    }

    deletePost(id) {
        return api.remove(`posts/${id}`)
    }
}

export default new PostsManager()