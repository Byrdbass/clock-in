import '../../App.css';
export default function Notes({handleNotesData, notesData, setNotesData}) {

    const updateNotesData = (event) => {
        setNotesData(event.target.value);
        handleNotesData(event.target.value)
    }

    return(

        <div className="inputSection" style={{ flexBasis: '100%' }}>
            <div className="header">Notes</div>
            <textarea
                id="notesField"
                placeholder="Enter notes here"
                style={{ height: '100px', fontSize: '1em' }}
                value={notesData}
                onChange={updateNotesData}
            ></textarea>
        </div>
    )
    }