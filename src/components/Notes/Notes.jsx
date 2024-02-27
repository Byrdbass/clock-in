import '../../App.css';
export default function Notes({handleNotesData, notes, setNotes}) {

    const updateNotesData = (event) => {
        setNotes(event.target.value);
        handleNotesData(event.target.value)
    }

    return(

        <div className="inputSection" style={{ flexBasis: '100%' }}>
            <div className="header">Notes</div>
            <textarea
                id="notesField"
                placeholder="Enter notes here"
                style={{ height: '100px', fontSize: '1em' }}
                value={notes}
                onChange={updateNotesData}
            ></textarea>
        </div>
    )
    }