import './dateInput.css'
import { useEffect } from 'react';
import { useEntry } from '../../utils/EntryProvider';


export default function DateInput({ handleDateData, date, setDate }) {

    const { entry, updateStartDate } = useEntry()    

    useEffect(() => {
        if (!date || date === ""){
            const currentDate = getTodaysDate();
            setDate(currentDate);
            handleDateData(currentDate)
        }
    }, []);
    
    
    const getTodaysDate = () => {
        const today = new Date(); 
        const currentDay = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()));
        return currentDay.toISOString().split('T')[0];  // Formats to YYYY-MM-DD
      };

    const updateDateData = (event) => {
        setDate(event.target.value);
        handleDateData(event.target.value);
        updateStartDate(event.target.value);
    }

    return (
        <div className="startDate-outer-div">
            <input
                type="date"
                className='date-field'
                value={entry.startDate}
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