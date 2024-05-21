export const getInitialDateTime = () => {
    const now = new Date();
    const nowZeroSec = new Date(now.getTime())
    nowZeroSec.setSeconds(0, 0)
    return nowZeroSec
}

export const getCurrentTime = () => {
    const now = new Date();
    const nowZeroSec = new Date(now.getTime())
    nowZeroSec.setSeconds(0, 0)
    const options = { hour: '2-digit', minute: '2-digit', hourCycle: 'h23'};
    const timeString = nowZeroSec.toLocaleTimeString('en-US', options);
    return timeString;
};

export const getCurrentDate = () => {
    const today = new Date();  // This gets the current date and time
    //formatting for Canada so the output is "YYYY-MM-DD" for parseDateTime.js
    return today.toLocaleDateString("en-CA"); 
}