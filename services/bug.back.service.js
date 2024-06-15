import { utilBackService } from "./util.back.service.js"
import { utilFrontService } from "../public/services/util.front.service.js"

export const bugBackService = { query, remove, getById, save }

var bugs = utilBackService.readJsonFile('./data/bug.json')



function query() {
    if (bugs.length === 0) {
        _createData()
            .then(() => bugs)
        return

    }
    return Promise.resolve(bugs)
}

function remove(bugId) {
    const idx = bugs.findIndex(bug => bug._id === bugId)
    bugs.splice(idx, 1)
    return _saveBugsToFile()
}

function getById(bugId) {
    const bug = bugs.find(bug => bug._id === bugId)
    if(!bug) return Promise.resolve('Dound it!')
    return Promise.resolve(bug)
}

function save(bugToSave) {
    let savedBug
    if (bugToSave._id !== '') savedBug = _edit(bugToSave)
    else savedBug = _add(bugToSave)
    return _saveBugsToFile()
        .then(() => savedBug)

}

function _add(bugToAdd) {
    const addedBug = { ...bugToAdd }
    addedBug._id = utilFrontService.makeId()
    addedBug.createdAt = new Date()
    bugs.push(addedBug)
    return addedBug

}
function _edit(bugToEdit) {
    const idx = bugs.findIndex(b => b._id === bugToEdit._id)
    bugs.splice(idx, 1, bugToEdit)
    return bugToEdit
}

function _saveBugsToFile() {
    return utilBackService.writeJsonFile('./data/bug.json', bugs)
}

function _createData() {
    for (var i = 0; i < 12; i++) {
        const bug = {
            _id: utilFrontService.makeId(),
            title: utilFrontService.makeLorem(3),
            description: utilFrontService.makeLorem(9),
            severity: utilFrontService.getRandomIntInclusive(1, 10),
            createdAt: new Date(),
        }
        bugs.push(bug)
    }
    return _saveBugsToFile()
}