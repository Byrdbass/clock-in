import React, { createContext, useState, useContext, useEffect } from 'react';
import { getCurrentTime } from '../helpers/getCurrentTime';

const EntryContext = createContext();
export function useEntry() {
    return useContext(EntryContext)
}

export const EntryProvider = ({ children, duration }) => {
    const [entry, setEntry] = useState({
        userName: "",
        userRecordId: "",
        photoUrl: "",
        startDate: "YYYY-MM-DD",
        startTime: "HH:mm",
        endDate: "YYYY-MM-DD",
        endTime: "HH:mm",
        duration: 0,
        jobCode: "",
        jobCodeRecordId: "",
        taskId: 0,
        notes: "",
        dayAmount: "0:00",
        weekAmount: "0:00",
        payPeriodAmount: "0:00",
        showConfirmModal: false,
        showErrorModal: false,
        handleModalClose: false,
        submittedRecordId: ""
    })


    useEffect(() => {
        const currentTime = getCurrentTime();
        setStartTime(currentTime);
    }, [])


    return (
        <EntryContext.Provider value={{
            entry
        }}>
            {children}
        </EntryContext.Provider>
    )
}