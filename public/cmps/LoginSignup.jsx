const { useState, useEffect } = React
export function LoginSignup() {
    const [isSignup, setIsSignup] = useState(true)
    const [input, setInput] = useState({ username: '', password: '', name: '' })

    useEffect(() => {
        if (!isSignup) {
            setInput({ username: '', password: '' })
        }
        else {
            setInput({ username: '', password: '', name: '' })
        }
    }, [isSignup])

    function handleChange({ target }) {
        const { name, value } = target
        const newInput = { ...input, [name]: value }
        setInput(newInput)

    }
    return <section className="login-signup">
        <div>
            <div>
                <label htmlFor="username">Username:</label>
                <input onChange={handleChange} value={input.username} name="username"
                    placeholder="Enter username..." type="text" id="username" />

            </div>

            <div>
                <label htmlFor="password">Password:</label>
                <input onChange={handleChange} value={input.password} name="password"
                    placeholder="Enter password..." type="text" id="password" />
            </div>
        </div>
        {isSignup && <div>
            <label htmlFor="name">Full Name:</label>
            <input onChange={handleChange} value={input.mail} name="name"
                placeholder="Enter name..." type="text" id="name" />

        </div>}
        <div>
            <button onClick={() => setIsSignup(true)}>Sign Up</button>
            <button onClick={() => setIsSignup(false)}>Log In</button>
        </div>

    </section>
}