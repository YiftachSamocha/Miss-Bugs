import { bugFrontService } from "../services/bug.front.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { userFrontService } from "../services/user.front.service.js"

const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouterDOM
export function BugEdit() {
    const [bugToSave, setBugToSave] = useState({ title: '', severity: 0, description: '', creator: userFrontService.getCurrLogin() })
    const navigate = useNavigate()
    const { bugId } = useParams()

    useEffect(() => {
        if (bugId) {
            bugFrontService.getById(bugId)
                .then(currBug => setBugToSave(currBug))
        }
    }, [bugId])


    function handleChange({ target }) {
        const { name, value } = target
        let newBug
        if (name === 'severity') {
            newBug = { ...bugToSave, severity: +value }
        } else {
            newBug = { ...bugToSave, [name]: value }
        }

        setBugToSave(newBug)
    }

    function onSaveBug() {
        if (bugToSave._id) {
            onEditBug()
        }
        else {
            onAddBug()
        }
    }

    function onEditBug() {
        bugFrontService.save(bugToSave)
            .then((savedBug) => {
                console.log('Updated Bug:', savedBug)
                showSuccessMsg('Bug updated')
                navigate('/bug')
            })
            .catch((err) => {
                console.log('Error from onEditBug ->', err)
                showErrorMsg('Cannot update bug')
                navigate('/bug')
            })
    }

    function onAddBug() {
        bugFrontService.save(bugToSave)
            .then((savedBug) => {
                console.log('Added Bug', savedBug)
                showSuccessMsg('Bug added')
                navigate('/bug')
            })
            .catch((err) => {
                console.log('Error from onAddBug ->', err)
                showErrorMsg('Cannot add bug')
            })
    }


    return <section className="edit">
        <div>
            <label htmlFor="title">Title:</label>
            <input type="text" id="title" name="title" placeholder="Enter title..."
                value={bugToSave.title} onChange={handleChange} />
        </div>
        <div>
            <label htmlFor="severity">Severity:</label>
            <input type="number" id="severity" name="severity" 
                value={bugToSave.severity} onChange={handleChange} />
        </div>
        <div>
            <label htmlFor="description">Description:</label>
            <input type="text" id="description" name="description" placeholder="Enter description..."
                value={bugToSave.description} onChange={handleChange} />
        </div>
        <button onClick={onSaveBug}>Save</button>
    </section>

}


