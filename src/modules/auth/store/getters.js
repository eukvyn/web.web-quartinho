export default {
    isAuthenticated: state => !!state.token,
    user: state => state.user,
}
