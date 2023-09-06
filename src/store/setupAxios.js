export default function setupAxios(axios, store) {
  // ** Add request interceptor
  axios.interceptors.request.use(
    config => {
      const {
        account
      } = store.getState()

      config.headers.Authorization = account.token;

      return config
    },
    err => Promise.reject(err)
  )
  // ** Add response interceptor
  axios.interceptors.response.use(
    response => response,
    error => {
      const { response } = error
      // ** if (status === 401) {
      if (response && response.status === 401) {
        window.location.href = "/not-authorized"
      }
      return Promise.reject(error)
    }
  )
}
  