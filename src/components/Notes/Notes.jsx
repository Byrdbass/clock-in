import './notes.css'
export default function Notes({handleNotesData, notes, setNotes}) {

    const updateNotesData = (event) => {
        setNotes(event.target.value);
        handleNotesData(event.target.value)
    }

    return(

        <div className="notes-outer-div">
            <div className="notes-inner-div">Notes
                <div className='notes-required-star'>*</div>
            </div>
            <textarea
                className="notes-field"
                // placeholder="Enter notes here"
                value={notes}
                onChange={updateNotesData}
            ></textarea>
        </div>
    )
    }