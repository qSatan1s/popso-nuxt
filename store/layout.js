export const state = () => ({
  layout: true,
})

export const mutations = {
  setLayout(state) {
    state.layout = !state.layout
  },
}

export const getters = {
  layout: (state) => state.layout,
}
