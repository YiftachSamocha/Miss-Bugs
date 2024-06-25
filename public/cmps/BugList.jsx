const { Link } = ReactRouterDOM

import { BugPreview } from './BugPreview.jsx'

export function BugList({ bugs, onRemoveBug, user }) {

  function isShown(bug) {
    if (!user) return false
    if(user.isAdmin) return true
    return user._id === bug.creator._id
  }

  return (
    <ul className="bug-list">
      {bugs.map((bug) => (
        <li className="bug-preview" key={bug._id}>
          <BugPreview bug={bug} />
          <div>
            {isShown(bug) && <button className='remove-button'
              onClick={() => {
                onRemoveBug(bug._id)
              }}
            >
              x
            </button>}
            {isShown(bug) && <Link to={`/bug/edit/${bug._id}`}>Edit</Link>}
            <Link to={`/bug/${bug._id}`}>Details</Link>
          </div>

        </li>
      ))}
    </ul>
  )
}
