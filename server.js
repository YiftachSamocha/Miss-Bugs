import express, { json } from 'express'
import cookieParser from 'cookie-parser'
import { bugBackService } from './services/bug.back.service.js'
import { userService } from './services/user.service.js'

const app = express()
app.use(express.static('public'))
app.use(cookieParser())
app.use(express.json())

app.get('/api/bug', (req, res) => {
    const filterBy = req.query
    bugBackService.query(filterBy)
        .then(bugs => res.send(bugs))
})

app.put('/api/bug', (req, res) => {
    const { _id, title, severity, description, createdAt, labels } = req.body
    const bug = { _id, title, severity: Number(severity), description, createdAt, labels }
    bugBackService.edit(bug)
        .then(editedBug => res.send(editedBug))

})

app.post('/api/bug', (req, res) => {
    const { title, severity, description } = req.body
    const bug = { title, severity: Number(severity), description }
    bugBackService.add(bug)
        .then(addedBug => res.send(addedBug))

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

app.delete('/api/bug/:id', (req, res) => {
    const { id } = req.params
    bugBackService.remove(id)
        .then(() => res.send('Removed!'))
})

//USER

// app.get('api/user/:id', (req, res) => {
//     const { id } = req.params
//     userService.getUserById(id)
//         .then(user => res.send(user))
// })

app.post('/api/auth/login', (req, res) => {
    const credentials = req.body
    userService.getUser(credentials)
        .then(user => res.send(user))
})

app.post('/api/auth/signup', (req, res) => {
    const credentials = req.body
    userService.save(credentials)
        .then(user => res.send(user))

})


app.listen(3030, () => console.log('Server listening on port http://127.0.0.1:3030/'))
