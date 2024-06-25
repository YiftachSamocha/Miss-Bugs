const { Link } = ReactRouterDOM
const { useState, useEffect } = React

import { bugFrontService } from '../services/bug.front.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

import { BugList } from '../cmps/BugList.jsx'
import { BugFilter } from '../cmps/BugFilter.jsx'
import { LoginSignup } from '../cmps/LoginSignup.jsx'
import { userFrontService } from '../services/user.front.service.js'



export function BugIndex() {
  const [bugs, setBugs] = useState([])
  const [filterBy, setFilterBy] = useState({ title: '', severity: 0, labels: [], sortBy: 'title', pageIdx: 1 })
  const [user, setUser] = useState(userFrontService.getCurrLogin())

  useEffect(() => {
    loadBugs()
  }, [filterBy])

  function loadBugs() {
    bugFrontService.query(filterBy)
      .then(res => {
        setBugs(res)
      })
  }

  function onRemoveBug(bugId) {
    bugFrontService.remove(bugId)
      .then(() => {
        console.log('Deleted Succesfully!')
        setBugs(prevBugs => prevBugs.filter((bug) => bug._id !== bugId))
        showSuccessMsg('Bug removed')
      })
      .catch((err) => {
        console.log('Error from onRemoveBug ->', err)
        showErrorMsg('Cannot remove bug')
      })
  }
  function onLogOut() {
    userFrontService.logout()
      .then(() => setUser(null))
  }


  return (
    <main>
      <h3>Bugs App</h3>
      <section className='headers'>
        {!user ? <LoginSignup onSetUser={setUser} />
          : <section>
            <p>Welcome {user.name}</p>
            <button onClick={onLogOut} >Log Out</button>
          </section>}
        <BugFilter filterBy={filterBy} setFilterBy={setFilterBy} />
      </section>
      <main>
        <button className="add-button"><Link to="/bug/edit">Add</Link></button>
        <BugList bugs={bugs} onRemoveBug={onRemoveBug} user={user} />
      </main>
    </main>
  )
}
