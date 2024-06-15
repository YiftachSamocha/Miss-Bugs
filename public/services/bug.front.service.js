export const bugFrontService = { query, remove, getById, save }

const BASE_URL = '/api/bug'

function query() {
    return axios.get(BASE_URL)
        .then(res => res.data)
}

function remove(bugId) {
    return axios.get(BASE_URL + '/' + bugId + '/remove')
        .then(res => res.data)
}

function getById(bugId) {
    return axios.get(BASE_URL + '/' + bugId)
        .then(res => res.data)
}

function save(bugToSave) {
    const query = `/save?_id=${bugToSave._id || ''}&title=${bugToSave.title}&severity=${bugToSave.severity}&description=${bugToSave.description}&createdAt=${bugToSave.createdAt}`
    return axios.get(BASE_URL + query)
        .then(res => res.data)
}