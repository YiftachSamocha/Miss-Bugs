import { userFrontService } from "../services/user.front.service.js"

const { useState, useEffect } = React
export function UserIndex() {
    const [users, setUsers] = useState([])
    useEffect(() => {
        userFrontService.query()
            .then(res => setUsers(res))
    }, [])

    function removeUser(id) {
        userFrontService.remove()
            .then(() => setUsers(users.filter(user => user._id !== id)))
    }
    return <section className="user-list">
        {users.map(user => {
            return <div key={user._id}>
                <p>{user.name}</p>
                <p>Username: {user.username}</p>
                <button onClick={() => removeUser(user._id)} >X</button>
            </div>
        })}

    </section>
}