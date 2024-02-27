import '../../App.css'

export default function Date({handleDateData, date, setDate}) {

    const updateDateData = (event) => {
        setDate(event.target.value);
        handleDateData(event.target.value);
    }

    return (
        <div className="inputSection">
            <div className="header">Date</div>
            <input
                type="date"
                id="dateField"
                style={{ fontSize: '1em' }}
                value={date}
                onChange={updateDateData}
            />
        </div>
    )

}