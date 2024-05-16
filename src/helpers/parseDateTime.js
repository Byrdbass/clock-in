import moment from "moment"

export function convertTimeToDateObj(timeStr, dateStr){
    const [hour, minute] = timeStr.split(":").map(Number)
    const [year, month, date] = dateStr.split("-").map(Number)
    const newDateTime = new Date()
    newDateTime.setFullYear(year, month-1, date)
    newDateTime.setHours(hour, minute, 0, 0);
    return newDateTime
}

export function getDuration(startDateTime, endDateTime) {
    const start = moment(startDateTime)
    const end = moment(endDateTime)
    const diffInMinutes = end.diff(start, "minutes")
    //returns 0 if negative
    return Math.max(diffInMinutes, 0); 
}