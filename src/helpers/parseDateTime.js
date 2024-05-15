export function convertTimeToDateObj(timeStr, dateStr){
    const [hour, minute] = timeStr.split(":").map(Number)
    const [year, month, date] = dateStr.split("-").map(Number)
    const newDateTime = new Date()
    newDateTime.setFullYear(year, month-1, date)
    newDateTime.setHours(hour, minute);
    return newDateTime
}

export function getDuration(startDateTime, endDateTime) {
    const startDateISO = startDateTime.toISOString();
    const endDateISO = endDateTime.toISOString();
    const diffInMilliseconds = startDateISO.getTime() - endDateISO.getTime(); // Difference in milliseconds
    const diffInMinutes = diffInMilliseconds / (1000 * 60); 
    return Math.max(Math.abs(diffInMinutes)); 
}