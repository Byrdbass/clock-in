import React, { createContext, useState, useContext, useEffect } from 'react';
import { getCurrentTime } from '../helpers/getCurrentTime';

const DateContext = createContext();
export function useDate(){
    return useContext(DateContext)
}

export const DateProvider = ({ children, duration }) => {
    const [dateInfo, setDateInfo] = useState({
        startDate: "YYYY-MM-DD",
        startTime: "HH:mm",
        endDate: "YYYY-MM-DD",
        endTime: "HH:mm",
        duration: 0,
    })


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