import express from 'express'
import { bugBackService } from './services/bug.back.service.js'

const app = express()
app.use(express.static('public'))

app.get('/api/bug', (req, res) => {
    bugBackService.query()
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
    bugBackService.getById(id)
        .then(bug => res.send(bug))
})

app.get('/api/bug/:id/remove', (req, res) => {
    const { id } = req.params
    bugBackService.remove(id)
        .then(() => res.send('Removed!'))
})


app.listen(3030, () => console.log('Server listening on port http://127.0.0.1:3030/'))
