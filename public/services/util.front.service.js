export const utilFrontService = {
    makeId,
    makeLorem,
    getRandomIntInclusive
}

function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

function makeLorem(size = 100) {
    const words = [
        "Alice", "Bob", "Charlie", "Daisy", "Edward",
        "Fiona", "George", "Hannah", "Ivan", "Julia",
        "Lion", "Tiger", "Elephant", "Giraffe", "Zebra",
        "Monkey", "Kangaroo", "Penguin", "Dolphin", "Eagle"
    ]

    var txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}
