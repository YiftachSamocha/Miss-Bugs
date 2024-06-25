import express, { json } from 'express'
import cookieParser from 'cookie-parser'
import { bugBackService } from './services/bug.back.service.js'
import { userService } from './services/user.service.js'
import { loggerService } from './services/logger.service.js'

const app = express()
app.use(express.static('public'))
app.use(cookieParser())
app.use(express.json())

app.get('/api/bug', (req, res) => {
    const filterBy = req.query
    bugBackService.query(filterBy)
        .then(bugs => res.send(bugs))
        .catch((err) => {
            loggerService.error('Cannot get bugs', err)
            res.status(400).send('Cannot get bugs')
        })
})

app.put('/api/bug', (req, res) => {
    const loggedinUser = userService.validateToken(req.cookies.loginToken)
    if (!loggedinUser) return res.status(401).send('Cannot update bug')
    const { _id, title, severity, description, createdAt, labels, creator } = req.body
    const bug = { _id, title, severity: Number(severity), description, createdAt, labels, creator }
    bugBackService.edit(bug)
        .then(editedBug => res.send(editedBug))
        .catch((err) => {
            loggerService.error('Cannot update bug', err)
            res.status(400).send('Cannot update bug')
        })

})

app.post('/api/bug', (req, res) => {
    const loggedinUser = userService.validateToken(req.cookies.loginToken)
    if (!loggedinUser) return res.status(401).send('Cannot add bug')
    const { title, severity, description, creator } = req.body
    const bug = { title, severity: Number(severity), description, creator }
    bugBackService.add(bug)
        .then(addedBug => res.send(addedBug))
        .catch((err) => {
            loggerService.error('Cannot add bug', err)
            res.status(400).send('Cannot add bug')
        })

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
        .catch((err) => {
            loggerService.error('Cannot get bug', err)
            res.status(400).send('Cannot get bug')
        })
})

app.delete('/api/bug/:id', (req, res) => {
    const loggedinUser = userService.validateToken(req.cookies.loginToken)
    if (!loggedinUser) return res.status(401).send('Cannot remove bug')
    const { id } = req.params
    bugBackService.remove(id)
        .then(() => res.send('Removed!'))
        .catch((err) => {
            loggerService.error('Cannot remove bug', err)
            res.status(400).send('Cannot remove bug')
        })
})

app.get('/api/bug/user/:id', (req, res) => {
    const { id } = req.params
    bugBackService.getBugsByUser(id)
        .then(bugs => res.send(bugs))
        .catch((err) => {
            loggerService.error('Cannot get user', err)
            res.status(400).send('Cannot get user')
        })
})

//USER

app.get('/api/user', (req, res) => {
    userService.query()
        .then(users => res.send(users))
        .catch((err) => {
            loggerService.error('Cannot get users', err)
            res.status(400).send('Cannot get users')
        })
})

app.delete('/api/user/:id', (req, res) => {
    const { id } = req.params
    userService.remove(id)
        .then(message => res.send(message))
        .catch((err) => {
            loggerService.error('Cannot remove user', err)
            res.status(400).send('Cannot remove user')
        })
})

app.get('/api/user/:id', (req, res) => {
    const { id } = req.params
    userService.getUserById(id)
        .then(user => res.send(user))
})

app.post('/api/auth/login', (req, res) => {
    const credentials = req.body
    userService.getUser(credentials)
        .then(user => {
            const loginToken = userService.getLoginToken(user)
            res.cookie('loginToken', loginToken)
            res.send(user)
        })
        .catch(() => res.status(401).send('Invalid Credentials'))
})

app.post('/api/auth/signup', (req, res) => {
    const credentials = req.body
    userService.save(credentials)
        .then(user => {
            const loginToken = userService.getLoginToken(user)
            res.cookie('loginToken', loginToken)
            res.send(user)
        })
        .catch((err) => {
            loggerService.error('Cannot signup', err)
            res.status(400).send('Cannot signup')
        })

})

app.delete('/api/auth/logout', (req, res) => {
    res.clearCookie('loginToken')
    res.send('Logged out!')
})




app.listen(3030, () => console.log('Server listening on port http://127.0.0.1:3030/'))
