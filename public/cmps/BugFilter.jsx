const { useState } = React
export function BugFilter({ filterBy, setFilterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    const [isLabelsOpen, setIsLabelsOpen] = useState(false)

    function onFilterTitle({ target }) {
        const { value } = target
        const currFilter = { ...filterByToEdit, title: value }
        setFilterByToEdit(currFilter)
        setFilterBy(currFilter)
    }

    function onFilterSeverity({ target }) {
        const { value } = target
        const currFilter = { ...filterByToEdit, severity: +value }
        setFilterByToEdit(currFilter)
        setFilterBy(currFilter)
    }

    function onFilterLabels({ target }) {
        const { checked, name } = target
        let currFilter
        const labels = [...filterByToEdit.labels]
        console.log(labels)
        if (checked) {
            labels.push(name)
            currFilter = { ...filterByToEdit, labels }
        }
        else {
            currFilter = { ...filterByToEdit, labels: labels.filter(label => label !== name) }

        }
        setFilterByToEdit(currFilter)
        setFilterBy(currFilter)

    }

    function onFilterSort(sortBy) {
        const currFilter = { ...filterBy, sortBy: sortBy }
        setFilterByToEdit(currFilter)
        setFilterBy(currFilter)
    }



    const labels = ['Critical', 'Need-CR', 'Dev-branch', 'High-Priority', 'Feature-Request', 'UI/UX', 'Backend', 'Performance', ' Documentation']

    return <section className="filters">
        <section>
            <p>Filter By:</p>
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
            <div className="labels">
                <button onClick={() => setIsLabelsOpen(!isLabelsOpen)} >Labels</button>
                <section>
                    {isLabelsOpen && labels.map(label => {
                        return <div>
                            <label htmlFor={label}>{label}</label>
                            <input type="checkbox" name={label} id={label}
                                checked={filterByToEdit.labels.some(l => l === label)}
                                onChange={onFilterLabels} />
                        </div>
                    })}
                </section>
            </div>

        </section>

        <div>
            <p>Sort By:</p>
            <button onClick={() => onFilterSort('title')}>Title</button>
            <button onClick={() => onFilterSort('severity')}>Severity</button>
            <button onClick={() => onFilterSort('date')}>Date</button>
        </div>



    </section >
}