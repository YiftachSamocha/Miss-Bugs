const { Link } = ReactRouterDOM

import { BugPreview } from './BugPreview.jsx'

export function BugList({ bugs, onRemoveBug, user }) {

  function isUser(bug) {
    if (!user) return false
    return user._id === bug.creator._id
  }

  return (
    <ul className="bug-list">
      {bugs.map((bug) => (
        <li className="bug-preview" key={bug._id}>
          <BugPreview bug={bug} />
          <div>
            {isUser(bug) && <button className='remove-button'
              onClick={() => {
                onRemoveBug(bug._id)
              }}
            >
              x
            </button>}
            {isUser(bug) && <Link to={`/bug/edit/${bug._id}`}>Edit</Link>}
            <Link to={`/bug/${bug._id}`}>Details</Link>
          </div>

        </li>
      ))}
    </ul>
  )
}
