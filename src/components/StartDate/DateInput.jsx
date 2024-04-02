import './dateInput.css'
import { useEffect } from 'react';



export default function DateInput({ handleDateData, date, setDate }) {

    useEffect(() => {
        if (!date || date === ""){
            const currentDate = getTodaysDate();
            setDate(currentDate);
            handleDateData(currentDate)
        }
    }, []);
    
    
    const getTodaysDate = () => {
        const today = new Date();
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const currentDay = today.toLocaleDateString('en-CA', { 
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            timeZone: `${tz}` 
        });
        return currentDay
      };

    const updateDateData = (event) => {
        setDate(event.target.value);
        handleDateData(event.target.value);
    }

    return (
        <div className="date-outer-div">
            <div className="date-inner-div"></div>
            <input
                type="date"
                className='date-field'
                value={date}
                onChange={updateDateData}
                style={{
                    border:'none', 
                    backgroundColor: 'inherit',
                    fontSize: '14px',
                    fontWeight: '400',
                    lineHeight: '16.94px',
                    width: '7rem'
                }}
            />
            <span className="calendar-icon"></span>
        </div>
    )

}