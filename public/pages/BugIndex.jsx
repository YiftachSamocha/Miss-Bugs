import { bugFrontService } from '../services/bug.front.service.js'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { BugList } from '../cmps/BugList.jsx'
import { BugFilter } from '../cmps/BugFilter.jsx'


const { useState, useEffect } = React

export function BugIndex() {
  const [bugs, setBugs] = useState([])
  const [filterBy, setFilterBy] = useState({ title: '', severity: 0 })

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

  function onAddBug() {
    const bug = {
      title: prompt('Bug title?'),
      severity: +prompt('Bug severity?'),
      description: prompt('Bug description?')
    }
    bugFrontService.save(bug)
      .then((savedBug) => {
        console.log('Added Bug', savedBug)
        setBugs(prevBugs => [...prevBugs, savedBug])
        showSuccessMsg('Bug added')
      })
      .catch((err) => {
        console.log('Error from onAddBug ->', err)
        showErrorMsg('Cannot add bug')
      })
  }

  function onEditBug(bug) {
    const severity = +prompt('New severity?')
    const bugToSave = { ...bug, severity }
    bugFrontService.save(bugToSave)
      .then((savedBug) => {
        console.log('Updated Bug:', savedBug)
        setBugs(prevBugs => prevBugs.map((currBug) =>
          currBug._id === savedBug._id ? savedBug : currBug
        ))
        showSuccessMsg('Bug updated')
      })
      .catch((err) => {
        console.log('Error from onEditBug ->', err)
        showErrorMsg('Cannot update bug')
      })
  }

  return (
    <main>
      <h3>Bugs App</h3>
      <BugFilter filterBy={filterBy} setFilterBy={setFilterBy} />
      <main>
        <button onClick={onAddBug}>Add Bug ⛐</button>
        <BugList bugs={bugs} onRemoveBug={onRemoveBug} onEditBug={onEditBug} />
      </main>
    </main>
  )
}
