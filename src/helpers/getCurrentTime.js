export const getCurrentTime = () => {
    const now = new Date();
    const options = { hour: '2-digit', minute: '2-digit', hourCycle: 'h23'};
    const timeString = now.toLocaleTimeString('en-US', options);
    return timeString;
};

export const getCurrentDate = () => {
    const today = new Date();  // This gets the current date and time
    return today.toISOString().split('T')[0]; 
}