const { Link } = ReactRouterDOM

import { BugPreview } from './BugPreview.jsx'

export function BugList({ bugs, onRemoveBug, user }) {

  return (
    <ul className="bug-list">
      {bugs.map((bug) => (
        <li className="bug-preview" key={bug._id}>
          <BugPreview bug={bug} />
          <div>
            <button className='remove-button'
              onClick={() => {
                onRemoveBug(bug._id)
              }}
            >
              x
            </button>
            {user._id === bug.creator._id && <Link to={`/bug/edit/${bug._id}`}>Edit</Link>}
            <Link to={`/bug/${bug._id}`}>Details</Link>
          </div>

        </li>
      ))}
    </ul>
  )
}
