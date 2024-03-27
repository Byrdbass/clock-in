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
            <div className="date-inner-div">Start Date</div>
            <input
                type="date"
                className='date-field'
                value={date}
                onChange={updateDateData}
            />
            <button className='today-btn'>Today</button>
        </div>
    )

}