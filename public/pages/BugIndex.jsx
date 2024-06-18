const { Link } = ReactRouterDOM

import { bugFrontService } from '../services/bug.front.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

import { BugList } from '../cmps/BugList.jsx'
import { BugFilter } from '../cmps/BugFilter.jsx'

const { useState, useEffect } = React

export function BugIndex() {
  const [bugs, setBugs] = useState([])
  const [filterBy, setFilterBy] = useState({ title: '', severity: 0, labels: [], sortBy: 'title', pageIdx: 1 })

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



  return (
    <main>
      <h3>Bugs App</h3>
      <BugFilter filterBy={filterBy} setFilterBy={setFilterBy} />
      <main>
        <Link to="/bug/edit">Add</Link>
        <BugList bugs={bugs} onRemoveBug={onRemoveBug} />
      </main>
    </main>
  )
}
