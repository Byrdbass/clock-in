import React, { createContext, useState, useContext, useEffect } from 'react';
import { convertTimeToDateObj, getDuration } from '../helpers/parseDateTime';
import { getInitialDateTime ,getCurrentTime, getCurrentDate } from '../helpers/getCurrentTime'
import { getTeammateRecord, getProductNameAndID } from '../helpers/airTableGetJobcodes';


const EntryContext = createContext();
export function useEntry() {
    return useContext(EntryContext)
}

export const EntryProvider = ({ children, duration }) => {
    const params = new URLSearchParams(window.location.search);
    const initialUserRecordId = params.get('userRecordID')
        || "recMhLRHRvxzjIHpn";
    const initialTime = getCurrentTime()
    const initialDate = getCurrentDate()

    const [entry, setEntry] = useState({
        userName: "",
        userRecordId: initialUserRecordId,
        photoUrl: "",
        startDateTime: getInitialDateTime(), //in UTC - local time zone calc. of +/- hrs
        startTime: initialTime,
        startDate: initialDate,
        endDateTime: getInitialDateTime(),
        endTime: initialTime, //or initialize to "undefined?"
        endDate: initialDate,
        duration: 0,
        jobCodeType: "Recent Job Codes",
        jobCodeColor: 'dark',
        jobCodeArr: {},
        jobCodeAllRecordIdArr: [],
        jobCodeAllAssignRecordIdArr: [],
        jobCodeRecentRecordIdArr: [],
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

    //get user info on page load
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
                    let recentJobCodes = record.fields.Recently_Used_Jobcodes_nonTest
                    let recentJobCodeRecordIds = record.fields.Recently_Used_Jobcodes_record_ID_nonTest
                    let allAssignJobCodes = record.fields.All_Assigned_Jobcodes_Rollup
                    let allAssignJobCodeRecordIds = record.fields.All_Assigned_Jobcodes_record_ID
                    let recentJobCodeArr = []
                    let allJobCodeArr = []
                    for (let i = 0; i < recentJobCodes.length; i++) {
                        let obj = {
                            jobCode: recentJobCodes[i] || "no jobcode",
                            recordId: recentJobCodeRecordIds[i] || "No Record ID"
                        };
                        recentJobCodeArr.push(obj);
                    }
                    for (let i = 0; i < allAssignJobCodes.length; ++i) {
                        let obj = {
                            jobCode: allAssignJobCodes[i] || "no jobcode",
                            recordId: allAssignJobCodeRecordIds[i] || "No Record ID"
                        }
                        allJobCodeArr.push(obj)
                    }
                    const filteredJobCodeArr = recentJobCodeArr.filter(obj => !obj.jobCode.includes("Error"));
                    setEntry(prevEntry => ({
                        ...prevEntry,
                        userName: userNameRecord,
                        photoUrl: photoRecord,
                        dayAmount: dayAmountRecord,
                        weekAmount: weekAmountRecord,
                        payPeriodAmount: payPeriodAmountRecord,
                        jobCodeRecentRecordIdArr: filteredJobCodeArr,
                        jobCodeAllAssignRecordIdArr: allJobCodeArr,
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
                const jobCodeRecordIds = Object.values(jobRecordAndIdsObj);
                let allJobCodeArr = []
                for (let i = 0; i < jobCodes.length; ++i) {
                    let obj = {
                        jobCode: jobCodes[i],
                        recordId: jobCodeRecordIds[i] || "No Record ID"
                    }
                    allJobCodeArr.push(obj)
                }

                setEntry(prevEntry => ({
                    ...prevEntry,
                    // jobCodeArr: jobCodes, 
                    jobCodeAllRecordIdArr: allJobCodeArr
                }));

            } catch (error) {
                console.error("Failed to fetch jobcodes:", error);
            }
        }

        getTeammateInfo();
        getJobCodes()
    }, [entry.userRecordId])

    const updateJobCodeType = (newJobCodeType, newJobColor) => {
        setEntry(prev => ({
            ...prev,
            jobCodeType: newJobCodeType,
            jobCodeColor: newJobColor
        }))
    }

    const handleModalOpen = () => {
        setEntry(prev => ({ ...prev, showConfirmModal: true }))
    }

    const handleModalClose = async () => {
        try {
            const record = await getTeammateRecord(entry.userRecordId)
            let dayAmountRecord = record.fields["Today (Sum)"]
            let weekAmountRecord = record.fields["This Week (Sum)"]
            let payPeriodAmountRecord = record.fields["This Pay Period (Sum)"]
            let recentJobCodes = record.fields.Recently_Used_Jobcodes_nonTest
            let recentJobCodeRecordIds = record.fields.Recently_Used_Jobcodes_record_ID_nonTest
            let recentJobCodeArr = []
            for (let i = 0; i < recentJobCodes.length; i++) {
                let obj = {
                    jobCode: recentJobCodes[i] || "no jobcode",
                    recordId: recentJobCodeRecordIds[i] || "No Record ID"
                };
                recentJobCodeArr.push(obj);
            }
            const filteredJobCodeArr = recentJobCodeArr.filter(obj => !obj.jobCode.includes("Error"));
            setEntry(prevEntry => ({
                ...prevEntry,
                notes: "",
                showConfirmModal: false,
                //set updated start time with UTC
                dayAmount: dayAmountRecord,
                weekAmount: weekAmountRecord,
                payPeriodAmount: payPeriodAmountRecord,
                jobCodeType: "Recent Job Codes",
                jobCodeColor: "dark",
                jobCodeRecentRecordIdArr: filteredJobCodeArr,
                jobCodeArr: {}
                //TODO MOVE THESE TO WHEN MODAL CLOSES?
                // handleDateData(getTodaysDate())
                // setDate(getTodaysDate)
                // setStartTime(getCurrentTime())
                // handleStartTimeData(getCurrentTime())
                // setDuration(25)
                // setNotes("")
                // setDate("")
                // setClockIn(0)
            }))
        } catch (error) {
            console.error("Failed to UPDATE teammate record:", error);
        }
    }

    const showError = () => {
        setEntry(prev => ({ ...prev, showErrorModal: !prev.showErrorModal }))
    }

    const updateStartDate = (newStartDate) => {
        let newDateTime = convertTimeToDateObj(entry.startTime, newStartDate)
        setEntry(prev => ({ ...prev, startDate: newStartDate, startDateTime: newDateTime}))
    }

    const updateStartTime = (newStartTime) => {
        let newDateTime = convertTimeToDateObj(newStartTime, entry.startDate)
        setEntry(prev => ({ ...prev, startTime: newStartTime, startDateTime: newDateTime}))
    }

    const updateEndDate = (newEndDate) => {
        let newDateTime = convertTimeToDateObj(entry.endTime, newEndDate)
        setEntry(prev => ({ ...prev, endDate: newEndDate, endDateTime: newDateTime}))
    }

    const updateEndTime = (newEndTime) => {
        let newDateTime = convertTimeToDateObj(newEndTime, entry.endDate)
        setEntry(prev => ({ ...prev, endTime: newEndTime, endDateTime: newDateTime}))
    }

    const updateDuration = (startDateTime, endDateTime) => {
        let newDuration = getDuration(startDateTime, endDateTime)
        setEntry(prev => ({ ...prev, duration: newDuration}))
    }

    const updateNotes = (e) => {
        setEntry(prev => ({ ...prev, notes: e.target.value }))
    }

    const findJobCode = (arr, jobCodeName) => {
        const foundObj = arr.find(job => job.jobCode === jobCodeName)
        return foundObj
    }
    const updateJobCodes = (jobCodeName) => {
        const recordIdAll = findJobCode(entry.jobCodeAllRecordIdArr, jobCodeName)
        const recordIdRecent = findJobCode(entry.jobCodeRecentRecordIdArr, jobCodeName)
        let updatedJobCodes;
        if (!recordIdAll.recordId) {
            updatedJobCodes = {
                jobCode: jobCodeName,
                recordId: "recBrwBB7eRuIDIuz"
                // || "recBrwBB7eRuIDIuz"
            };
        } else {
            updatedJobCodes = {
                jobCode: jobCodeName,
                recordId: recordIdAll.recordId
                // || "recBrwBB7eRuIDIuz"
            };
        }
        setEntry(prev => ({ ...prev, jobCodeArr: updatedJobCodes }));
    }

    return (
        <EntryContext.Provider value={{
            entry, setEntry,
            updateJobCodeType,
            handleModalOpen,
            handleModalClose,
            showError,
            updateStartDate,
            updateStartTime,
            updateEndDate,
            updateEndTime,
            updateDuration,
            updateNotes,
            updateJobCodes,
        }}>
            {children}
        </EntryContext.Provider>
    )
}