export const bugService = { query, remove }

const BASE_URL = '/api/bug'

function query() {
    return axios.get(BASE_URL)
        .then(res => res.data)
}

function remove(bugId) {
    return axios.get(BASE_URL + '/' + bugId + '/remove')
        .then(res => res.data)

}