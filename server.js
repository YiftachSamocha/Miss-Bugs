import express from 'express'
import cookieParser from 'cookie-parser'
import { bugBackService } from './services/bug.back.service.js'

const app = express()
app.use(express.static('public'))
app.use(cookieParser())

app.get('/api/bug', (req, res) => {
    const { title, severity } = req.query
    const filterBy = { title, severity: +severity }
    bugBackService.query(filterBy)
        .then(bugs => res.send(bugs))
})

app.get('/api/bug/save', (req, res) => {
    const { _id, title, severity, description, createdAt } = req.query
    const bug = { _id, title, severity: Number(severity), description, createdAt: Number(createdAt) }
    bugBackService.save(bug)
        .then(newBug => res.send(newBug))

})

app.get('/api/bug/:id', (req, res) => {
    const { id } = req.params
    var visitedBugs = req.cookies.visitedBugs || []
    if (visitedBugs.length >= 3) {
        return res.status(401).send('Wait for a bit')
    }
    if (!visitedBugs.includes(id)) {
        visitedBugs.push(id)
    }
    res.cookie('visitedBugs', visitedBugs, { maxAge: 7000 })
    console.log('User visited at the following bugs:' + visitedBugs)
    bugBackService.getById(id)
        .then(bug => {
            res.send(bug)
        })



})

app.get('/api/bug/:id/remove', (req, res) => {
    const { id } = req.params
    bugBackService.remove(id)
        .then(() => res.send('Removed!'))
})


app.listen(3030, () => console.log('Server listening on port http://127.0.0.1:3030/'))
