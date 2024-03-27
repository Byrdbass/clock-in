import './notes.css'
export default function Notes({handleNotesData, notes, setNotes}) {

    const updateNotesData = (event) => {
        setNotes(event.target.value);
        handleNotesData(event.target.value)
    }

    return(

        <div className="notes-outer-div" style={{ flexBasis: '100%' }}>
            <div className="notes-inner-div">Notes</div>
            <textarea
                className="notes-field"
                placeholder="Enter notes here"
                style={{ height: '100px', fontSize: '1em' }}
                value={notes}
                onChange={updateNotesData}
            ></textarea>
        </div>
    )
    }