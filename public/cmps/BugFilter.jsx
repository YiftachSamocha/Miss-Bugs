const { useState } = React
export function BugFilter({ filterBy, setFilterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    function onFilterTitle({ target }) {
        const { value } = target
        const currFilter = { ...filterByToEdit, title: value }
        setFilterByToEdit(currFilter)
        setFilterBy(currFilter)
    }

    function onFilterSeverity({target}) {
        const { value } = target
        const currFilter = { ...filterByToEdit, severity: +value }
        setFilterByToEdit(currFilter)
        setFilterBy(currFilter)
    }

    return <section>
        <div>
            <label htmlFor="title">Title:</label>
            <input type="text" id="title" value={filterByToEdit.title}
                placeholder="Enter title..." onChange={onFilterTitle} />
        </div>

        <div>
            <label htmlFor="min-severity">Severity:</label>
            <input type="number" id="min-severity" value={filterByToEdit.severity}
                placeholder="Enter severity" onChange={onFilterSeverity} />
        </div>
    </section>
}