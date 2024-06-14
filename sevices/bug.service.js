import { utilService } from "./util.service.js"

export const bugService = { query, remove }

const bugs = utilService.readJsonFile('./data/bug.json')



function query() {
    return Promise.resolve(bugs)
}

function remove(bugId) {
    const newBugs = bugs.filter(bug => bug.id !== bugId)
    return _saveBugsToFile(newBugs)
    
}

function _saveBugsToFile(newBugs) {
    return utilService.writeJsonFile('./data/bug.json', newBugs)
}