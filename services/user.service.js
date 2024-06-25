import { utilFrontService } from "../public/services/util.front.service.js";
import { utilBackService } from "./util.back.service.js";
export const userService = { save, getUser, createData, getUserById }
var users = utilBackService.readJsonFile('./data/user.json')

function save(user) {
    user._id = utilBackService.makeId()
    users.push(user)
    return _saveUsersToFile().then(() => user)

}

function getUser(userToFind) {
    const user = users.find(currUser => currUser.username === userToFind.username && currUser.password === userToFind.password)
    return Promise.resolve(user)
}

function getUserById(id) {
    const user = users.find(user => user._id === id)
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