import './end-date.css'

export default function EndDate() {
    return (
        <>
            <div className="date-outer-div">
                <div className="date-inner-div">End Date</div>
                <input
                    type="date"
                    className='date-field'
                />
                <button className='today-btn'>Today</button>
            </div>
        </>
    )
}