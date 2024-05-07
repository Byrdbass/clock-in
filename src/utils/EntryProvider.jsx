import React, { createContext, useState, useContext, useEffect } from 'react';
import { getCurrentTime } from '../helpers/getCurrentTime';
import { getTeammateRecord, getProductNameAndID } from '../helpers/airTableGetJobcodes';

const EntryContext = createContext();
export function useEntry() {
    return useContext(EntryContext)
}

export const EntryProvider = ({ children, duration }) => {
    const params = new URLSearchParams(window.location.search);
    const initialUserRecordId = params.get('userRecordID') 
    || "recMhLRHRvxzjIHpn";
    const [entry, setEntry] = useState({
        userName: "",
        userRecordId: initialUserRecordId,
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
        const getTeammateInfo = async () => {
            if (entry.userRecordId) {
                try {
                    const record = await getTeammateRecord(entry.userRecordId);
                    // console.log(record.fields)
                    let photoRecord = record.fields.Photo[0]?.url;
                    let userNameRecord = record.fields["Full Name"];
                    let dayAmountRecord = record.fields["Today (Sum)"]
                    let weekAmountRecord = record.fields["This Week (Sum)"]
                    let payPeriodAmountRecord = record.fields["This Pay Period (Sum)"]
                    setEntry(prevEntry => ({
                        ...prevEntry,
                        userName: userNameRecord,
                        photoUrl: photoRecord,
                        dayAmount: dayAmountRecord,
                        weekAmount: weekAmountRecord,
                        payPeriodAmount: payPeriodAmountRecord
                    }))
                } catch (error) {
                    console.error("Failed to fetch teammate record:", error);
                }
            }
        }
        const getJobCodes = async () => {
            try {
                const jobRecordAndIdsObj = await getProductNameAndID()
                const jobCodes = Object.keys(jobRecordAndIdsObj);
                const jobCodeRecordIds = { ...jobRecordAndIdsObj };
        
                setEntry(prevEntry => ({
                    ...prevEntry,
                    // jobCodeArr: jobCodes, 
                    jobCodeRecordIdArr: jobCodeRecordIds 
                }));
                
            } catch (error) {
                console.error("Failed to fetch jobcodes:", error);
            }
        }

        getTeammateInfo();
        getJobCodes()
    }, [entry.userRecordId])

    // useEffect(() => {
    //     const currentTime = getCurrentTime();
    //     setStartTime(currentTime);
    // }, [])

    const updateJobCodes = (index, jobCodeName) => {
        const updatedJobCodes = [...entry.jobCodeArr];
        updatedJobCodes[index] = {
            jobCode: jobCodeName,
            recordId: entry.jobCodeRecordIdArr[jobCodeName]
        };
        setEntry(prev => ({ ...prev, jobCodeArr: updatedJobCodes }));
    }

    return (
        <EntryContext.Provider value={{
            entry, setEntry,
            updateJobCodes
        }}>
            {children}
        </EntryContext.Provider>
    )
}