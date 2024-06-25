import { BugList } from "../cmps/BugList.jsx";
import { bugFrontService } from "../services/bug.front.service.js";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";
import { userFrontService } from "../services/user.front.service.js";

const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouterDOM

export function UserDetails() {
    const { userId } = useParams()
    const [user, setUser] = useState({})
    const [bugs, setBugs] = useState([])
    useEffect(() => {
        bugFrontService.getBugsByUser(userId)
            .then(correctBugs => setBugs(correctBugs))
            .then(() => userFrontService.getUserById(userId))
            .then(currUser => setUser(currUser))
    }, [userId])
    function onRemoveBug(bugId) {
        bugFrontService.remove(bugId)
            .then(() => {
                setBugs(prevBugs => prevBugs.filter((bug) => bug._id !== bugId))
                showSuccessMsg('Bug removed')
            })
            .catch((err) => {
                showErrorMsg('Cannot remove bug')
            })
    }


    return <section>
        <h2>{user.name}</h2>
        <h3>{user.username}</h3>
        <BugList user={user} onRemoveBug={onRemoveBug} bugs={bugs} />
    </section>
}