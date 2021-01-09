export const actions = {
  async FeatchPost(ctx, limit = Math.floor(Math.random() * Math.floor(10))) {
    const res = await fetch(
      'https://jsonplaceholder.typicode.com/todos?_limit=' + limit
    )

    const posts = await res.json()

    ctx.commit('updatePost', posts)
  },
}

export const state = () => ({
  posts: [],
})

export const mutations = {
  updatePost(state, posts) {
    state.posts = posts
  },
}

export const getters = {
  allPosts: (state) => state.posts,
}
