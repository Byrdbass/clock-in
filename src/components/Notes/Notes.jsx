import '../../App.css';
import { useState } from 'react';
export default function Notes({handleNotesData}) {
    const [notes, setNotes] = useState("")

    const updateNotesData = (newData) => {
        setNotes(newData);
        handleNotesData(newData)
    }

    return(

        <div className="inputSection" style={{ flexBasis: '100%' }}>
            <div className="header">Notes</div>
            <textarea
                id="notesField"
                placeholder="Enter notes here"
                style={{ height: '100px', fontSize: '1em' }}
                value={notes}
                onChange={(e) => updateNotesData(e.target.value)}
            ></textarea>
        </div>
    )
    }