const { NavLink, Link, useNavigate } = ReactRouterDOM
const { useState } = React

import { userFrontService } from '../services/user.front.service.js'
import { LoginSignup } from './LoginSignup.jsx'
import { UserMsg } from './UserMsg.jsx'

export function AppHeader() {
  const [user, setUser] = useState(userFrontService.getCurrLogin())
  const navigate = useNavigate()
  function onLogOut() {
    userFrontService.logout()
      .then(() => {
        setUser(null)
        navigate('/')
      })
  }

  function onSetUser(user) {
    setUser(user)
    navigate('/')

  }


  return (
    <header>
      <UserMsg />
      <nav>
        <NavLink to="/">Home</NavLink> |<NavLink to="/bug">Bugs</NavLink> |
        <NavLink to="/about">About</NavLink>
      </nav>
      <h1>Bugs are Forever</h1>
      {!user ? <LoginSignup onSetUser={onSetUser} />
        : <section>
          <p>Welcome {user.name} </p>
          {user.isAdmin && <div>
            <p>Admin</p>
            <Link to="/bug/user"><button>Users</button></Link>
          </div>}

          <Link to={'/bug/user/' + user._id}><button>Profile</button> </Link>
          <button onClick={onLogOut} >Log Out</button>
        </section>}
    </header>
  )
}
