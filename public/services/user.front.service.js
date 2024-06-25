import { showErrorMsg, showSuccessMsg } from "./event-bus.service.js"

export const userFrontService = { signup, login, logout, getCurrLogin, getUserById, query, remove }
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
            showSuccessMsg('Welcome ' + user.name)
            return user
        })
        .catch(() => showErrorMsg('Uncorrect username/ password. Try again!'))


}

function logout() {
    sessionStorage.removeItem(BUG_DB_SESSION)
    return Promise.resolve()
}

function getCurrLogin() {
    return JSON.parse(sessionStorage.getItem(BUG_DB_SESSION))

}

function getUserById(id) {
    return axios.get('/api/user/' + id)
        .then(res => res.data)
}

function query() {
    return axios.get('/api/user')
        .then(res => res.data)
}

function remove(id) {
    return axios.delete('/api/user/' + id)
        .then(res => showSuccessMsg(res.data))
}