import { utilBackService } from "./util.back.service.js"
import { utilFrontService } from "../public/services/util.front.service.js"
import { userService } from "./user.service.js"

export const bugBackService = { query, remove, getById, add, edit, getBugsByUser }

var bugs = utilBackService.readJsonFile('./data/bug.json')

const PAGE_SIZE = 8

function query(filterBy) {
    if (bugs.length === 0) {
        userService.createData()
            .then(() => _createData())
            .then(() => bugs)
        return

    }
    const filteredBugs = _filter(filterBy)
    const sortedBugs = _sort(filteredBugs, filterBy.sortBy)
    const startPageIdx = PAGE_SIZE * (filterBy.pageIdx - 1)
    const pagedBugs = sortedBugs.slice(startPageIdx, startPageIdx + PAGE_SIZE)
    return Promise.resolve(pagedBugs)
}

function remove(bugId) {
    const idx = bugs.findIndex(bug => bug._id === bugId)
    bugs.splice(idx, 1)
    return _saveBugsToFile()
}

function getById(bugId) {
    const bug = bugs.find(bug => bug._id === bugId)
    if (!bug) return Promise.resolve('Dound it!')
    return Promise.resolve(bug)
}


function add(bugToAdd) {
    const addedBug = { ...bugToAdd }
    addedBug._id = utilFrontService.makeId()
    addedBug.createdAt = new Date()
    addedBug.labels = _getRandomLabels()
    bugs.push(addedBug)
    return _saveBugsToFile()
        .then(() => addedBug)

}

function edit(bugToEdit) {
    const idx = bugs.findIndex(b => b._id === bugToEdit._id)
    bugs.splice(idx, 1, bugToEdit)
    return _saveBugsToFile()
        .then(() => bugToEdit)
}

function getBugsByUser(userId) {
    const bugsByUser = bugs.filter(bug => bug.creator._id === userId)
    return Promise.resolve(bugsByUser)

}

function _saveBugsToFile() {
    return utilBackService.writeJsonFile('./data/bug.json', bugs)
}

function _filter(filterBy) {
    return bugs.filter(bug => {
        let titleMatch = true
        let severityMatch = true
        let labelMatch = true
        if (filterBy.title) {
            titleMatch = bug.title.includes(filterBy.title);
        }

        if (typeof filterBy.severity !== 'undefined') {
            severityMatch = bug.severity > filterBy.severity
        }

        if (filterBy.labels && filterBy.labels.length > 0) {
            labelMatch = bug.labels.some(label => filterBy.labels.includes(label))
        }

        return titleMatch && severityMatch && labelMatch
    }
    )

}

function _sort(bugs, sortBy) {
    switch (sortBy) {
        case 'title':
            bugs.sort((a, b) => a.title.localeCompare(b.title))
            break
        case 'severity':
            bugs.sort((a, b) => a.severity - b.severity)
            break
        case 'date':
            bugs.sort((a, b) => a.createdAt - b.createdAt)
            break
    }
    return bugs

}


function _createData(size = 22) {
    for (var i = 0; i < size; i++) {
        const bug = {
            _id: utilFrontService.makeId(),
            title: utilFrontService.makeLorem(3),
            description: utilFrontService.makeLorem(9),
            severity: utilFrontService.getRandomIntInclusive(1, 10),
            createdAt: new Date(),
            labels: _getRandomLabels(),
            creator: _getRandomCreator()
        }
        bugs.push(bug)
    }
    return _saveBugsToFile()
}

function _getRandomLabels(size = 2) {
    const labels = ['Critical', 'Need-CR', 'Dev-branch', 'High-Priority', 'Feature-Request', 'UI/UX', 'Backend', 'Performance', 'Documentation']
    const shuffled = labels.sort(() => Math.random() - 0.5)
    return shuffled.slice(0, size)
}

function _getRandomCreator() {
    const users = utilBackService.readJsonFile('./data/user.json')
    const randomIndex = Math.floor(Math.random() * users.length)
    const { _id, name } = users[randomIndex]
    return { _id, name }

}


