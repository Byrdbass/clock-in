export default function Button() {
    return (
        <>
            <div className="inputSection" style={{ flexBasis: '100%', textAlign: 'center' }}>
                <button
                    id="submitTimesheet"
                    style={{ backgroundColor: 'orange', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    Submit Timesheet
                </button>

            </div>
        </>
    )
}