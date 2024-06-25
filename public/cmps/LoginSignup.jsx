import { userFrontService } from "../services/user.front.service.js"

const { useState, useEffect } = React
export function LoginSignup({ onSetUser }) {
    const [isSignup, setIsSignup] = useState(true)
    const [credentials, setCredentials] = useState({ username: '', password: '', name: '' })

    useEffect(() => {
        if (!isSignup) {
            setCredentials({ username: '', password: '' })
        }
        else {
            setCredentials({ username: '', password: '', name: '' })
        }
    }, [isSignup])

    function handleChange({ target }) {
        const { name, value } = target
        const newInput = { ...credentials, [name]: value }
        setCredentials(newInput)
    }

    function onSubmit() {
        if (isSignup) {
            userFrontService.signup(credentials)
                .then(user => onSetUser(user))
        }
        else {
            userFrontService.login(credentials)
                .then(user => onSetUser(user))
        }
    }
    return <section className="login-signup">
        <div>
            <button onClick={() => setIsSignup(true)}>Sign Up</button>
            <button onClick={() => setIsSignup(false)}>Log In</button>
        </div>
        <div className="credentials">
            <div>
                <label htmlFor="username">Username:</label>
                <input onChange={handleChange} value={credentials.username} name="username"
                    placeholder="Enter username..." type="text" id="username" />

            </div>

            <div>
                <label htmlFor="password">Password:</label>
                <input onChange={handleChange} value={credentials.password} name="password"
                    placeholder="Enter password..." type="text" id="password" />
            </div>
            {isSignup && <div>
                <label htmlFor="name">Full Name:</label>
                <input onChange={handleChange} value={credentials.mail} name="name"
                    placeholder="Enter name..." type="text" id="name" />

            </div>}
        </div>


        <button onClick={onSubmit}>Submit</button>

    </section>
}