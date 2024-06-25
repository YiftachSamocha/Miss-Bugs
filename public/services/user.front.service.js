export const userFrontService = { signup, login, logout, getCurrLogin }
const BASE_URL = '/api/auth'
const BUG_DB_SESSION = 'Curr Bug'
function signup(user) {
    return axios.post(BASE_URL + '/signup', user)
        .then(res => res.data)
        .then(user => {
            sessionStorage.setItem(BUG_DB_SESSION, JSON.stringify(user))
            return user
        })

}

function login(user) {
    return axios.post(BASE_URL + '/login', user)
        .then(res => res.data)
        .then(user => {
            sessionStorage.setItem(BUG_DB_SESSION, JSON.stringify(user))
            return user
        })


}

function logout() {
    sessionStorage.removeItem(BUG_DB_SESSION)
    return Promise.resolve()
}

function getCurrLogin() {
    return sessionStorage.getItem(BUG_DB_SESSION)

}


function getUserById(id) {
    return axios.get(BASE_URL + '/' + id)
        .then(res => res.data)
}