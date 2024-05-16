import './dateInput.css'
import { useEffect } from 'react';
import { useEntry } from '../../utils/EntryProvider';


export default function DateInput() {

    const { entry, updateStartDate } = useEntry()    

    const updateDateData = (event) => {
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