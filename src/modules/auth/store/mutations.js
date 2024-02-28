export default {
    setUser(state, user) {
        state.user = user
        localStorage.setItem('user', JSON.stringify(user))
    },
    setToken(state, token) {
        state.token = token
        localStorage.setItem('token', token)
    },
    logout(state) {
        state.user = null
        state.token = null
        localStorage.removeItem('user')
        localStorage.removeItem('token')
    },
}
