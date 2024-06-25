import { utilFrontService } from "../public/services/util.front.service.js";
import { utilBackService } from "./util.back.service.js";
export const userService = { query, remove, save, getUser, createData, getUserById }
var users = utilBackService.readJsonFile('./data/user.json')

function query() {
    return Promise.resolve(users)
}

function save(user) {
    user._id = utilBackService.makeId()
    users.push(user)
    return _saveUsersToFile().then(() => user)
}

function remove(userId) {
    const idxUserToRemove = users.findIndex(user => user._id === userId)
    users.splice(idxUserToRemove, 1)
    return _saveUsersToFile().then(() => 'Deleted successfully!')




}

function getUser(userToFind) {
    const user = users.find(currUser => currUser.username === userToFind.username && currUser.password === userToFind.password)
    if (!user) return Promise.reject()
    return Promise.resolve(user)
}

function getUserById(userId) {
    const user = users.find(currUser => currUser._id === userId)
    return Promise.resolve(user)
}


function _saveUsersToFile() {
    return utilBackService.writeJsonFile('./data/user.json', users)
}

function createData(length = 3) {
    users = [{
        _id: utilBackService.makeId(),
        username: utilFrontService.makeLorem(1),
        password: utilFrontService.makeLorem(1),
        name: utilFrontService.makeLorem(1),
        isAdmin: true,
    }]
    for (var i = 0; i < length; i++) {
        users.push({
            _id: utilBackService.makeId(),
            username: utilFrontService.makeLorem(1),
            password: utilFrontService.makeLorem(1),
            name: utilFrontService.makeLorem(1)
        })
    }
    return _saveUsersToFile()
}