export function convertTimeToDateObj(timeStr, dateStr){
    const [hour, minute] = timeStr.split(":").map(Number)
    const [year, month, date] = dateStr.split("-").map(Number)
    const newDateTime = new Date()
    newDateTime.setFullYear(year, month-1, date)
    newDateTime.setHours(hour, minute);
    console.log(newDateTime)
    return newDateTime
}