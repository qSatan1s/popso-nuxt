export default function ({ $axios, redirect, store }) {
  if (process.server) {
    $axios.setHeader('accept-encoding', '*')
  }

  $axios.interceptors.request.use((request) => {
    if (
      store.getters['auth/isAuthenticated'] &&
      !request.headers.common.Authorization
    ) {
      request.headers.common.Authorization = `Bearer ${store.getters['auth/token']}`
    }

    return request
  })

  $axios.onError((error) => {
    if (error.response) {
      if (error.response.status === 401) {
        redirect('/')
        store.dispatch('/')
      }

      if (error.response.status === 500) {
        console.log('Server 500 error')
      }
    }
  })
}
