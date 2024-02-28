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
        return today.toISOString().split('T')[0]; // Formats date as YYYY-MM-DD
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