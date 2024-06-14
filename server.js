import express from 'express'
import { bugService } from './sevices/bug.service.js'

const app = express()
app.use(express.static('public'))

app.get('/api/bug', (req, res) => {
    bugService.query()
        .then(bugs => res.send(bugs))
})

app.get('/api/bug/:id/remove', (req, res) => {
    const { id } = req.params
    bugService.remove(id)

})

app.listen(3030, () => console.log('Server listening on port http://127.0.0.1:3030/'))
