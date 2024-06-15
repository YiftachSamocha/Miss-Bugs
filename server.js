import express from 'express'
import { bugBackService } from './services/bug.back.service.js'

const app = express()
app.use(express.static('public'))

app.get('/api/bug', (req, res) => {
    bugBackService.query()
        .then(bugs => res.send(bugs))
})

app.get('/api/bug/:id', (req, res) => {
    const { id } = req.params
    bugBackService.getById(id)
        .then(bug => res.send(bug))
})

app.get('/api/bug/:id/remove', (req, res) => {
    const { id } = req.params
    bugBackService.remove(id)
})

app.get('/api/bug/save', (req, res) => {
    const { _id, title, severity, description } = req.query
    const bug = { _id, title, severity, description }
    bugBackService.save(bug)
        .then(bug => res.send(bug))
})

app.listen(3030, () => console.log('Server listening on port http://127.0.0.1:3030/'))
