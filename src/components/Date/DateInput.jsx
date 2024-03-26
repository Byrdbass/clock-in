import '../../App.css'
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
        console.log(currentDay)
        return currentDay
      };

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