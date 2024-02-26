import '../../App.css';
export default function Notes() {
    <div className="inputSection" style={{ flexBasis: '100%' }}>
        <div className="header">Notes</div>
        <textarea
            id="notesField"
            placeholder="Enter notes here"
            style={{ height: '100px', fontSize: '1em' }}
            value={notes}
        //   onChange={(e) => setNotes(e.target.value)}
        ></textarea>
    </div>
}