export const actions = {
  async FeatchTask(ctx, limit = Math.floor(Math.random() * Math.floor(10))) {
    const res = await fetch(
      'https://jsonplaceholder.typicode.com/todos?_limit=' + limit
    )

    const tasks = await res.json()

    ctx.commit('updatePost', tasks)
  },
}

export const state = () => ({
  tasks: [],
})

export const mutations = {
  updatePost(state, tasks) {
    state.tasks = tasks
  },
}

export const getters = {
  allTasks: (state) => state.tasks,
}
