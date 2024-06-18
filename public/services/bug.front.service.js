export const bugFrontService = { query, remove, getById, save }

const BASE_URL = '/api/bug'

function query(filterBy) {
    return axios.get(BASE_URL + `?title=${filterBy.title}&severity=${filterBy.severity}`)
        .then(res => res.data)
}

function remove(bugId) {
    return axios.delete(BASE_URL + '/' + bugId)
        .then(res => res.data)
}

function getById(bugId) {
    return axios.get(BASE_URL + '/' + bugId)
        .then(res => res.data)
}

function save(bugToSave) {
    if (bugToSave._id) {
        return axios.put(BASE_URL, bugToSave)
            .then(res => res.data)
    }
    else {
        return axios.post(BASE_URL, bugToSave)
            .then(res => res.data)
    }

}