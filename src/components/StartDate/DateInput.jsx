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
        const today = new Date();  // This gets the current date and time
        const currentDay = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()));
        return currentDay.toISOString().split('T')[0];  // Formats to YYYY-MM-DD
      };

    const updateDateData = (event) => {
        setDate(event.target.value);
        handleDateData(event.target.value);
    }

    return (
        <div className="startDate-outer-div">
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
                    width: '104.14px'
                }}
            />
            <span className="calendar-icon"></span>
        </div>
    )

}