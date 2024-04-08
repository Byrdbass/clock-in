import React, { createContext, useState, useContext, useEffect } from 'react';
import { getCurrentTime } from '../helpers/getCurrentTime';

const DateContext = createContext();
export function useDate(){
    return useContext(DateContext)
}

export const DateProvider = ({ children, duration }) => {
    const [startTime, setStartTime] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endTime, setEndTime] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        const currentTime = getCurrentTime();
        setStartTime(currentTime);
    },[])


    return (
        <DateContext.Provider value={{
            startTime, setStartTime,
            startDate, setStartDate,
            endTime, setEndTime,
            endDate, setEndDate,
        }}>
        {children}
        </DateContext.Provider>
    )
}