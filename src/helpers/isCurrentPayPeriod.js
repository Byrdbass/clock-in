export function isInCurrentPayPeriod(payPeriodBegin, payPeriodEnd, entryDate) {
    console.log(entryDate)
    const entryDateObj = new Date(entryDate);
    return entryDateObj >= payPeriodBegin && entryDateObj <= payPeriodEnd;
}


export function isPastPayPeriod(dateData) {
    const currentDate = new Date();
    const entryDate = new Date(dateData + 'T00:00:00Z');  // Ensures the date is treated as UTC

    const currentYear = currentDate.getUTCFullYear();
    const currentMonth = currentDate.getUTCMonth();

    let payPeriodStart;
    let payPeriodEnd;

    if (currentDate.getUTCDate() <= 15) {
        payPeriodStart = new Date(Date.UTC(currentYear, currentMonth, 1));  // First of the month
        payPeriodEnd = new Date(Date.UTC(currentYear, currentMonth, 15));  // Fifteenth of the month
    } else {
        payPeriodStart = new Date(Date.UTC(currentYear, currentMonth, 16)); // Sixteenth of the month
        payPeriodEnd = new Date(Date.UTC(currentYear, currentMonth + 1, 0)); // Last day of the month
    }
    
    // console.log('Entry Date:', entryDate.toISOString());
    // console.log('Pay Period Start:', payPeriodStart.toISOString());
    // console.log('Pay Period End:', payPeriodEnd.toISOString());

    return entryDate < payPeriodStart || entryDate > payPeriodEnd;
}



export function isFutureDate(dateData) {
    // TODO 
    // THESE DO NOT NEED TO BE WRAPPED IN NUMBER CLASS
    const currentDate = Number(new Date().getDate())
    const currentMonth = Number(new Date().getMonth()) + 1
    const currentYear = Number(new Date().getFullYear())
    const dateDataDayOfMonth = Number(new Date(dateData).getDate())
    // TODO:
        // WHY IS DATE DATA COMING IN AS ONE DAY EARLIER
    const dateDataPlus1 = dateDataDayOfMonth + 1
    const dateDataMonth = Number(new Date(dateData).getMonth()) + 1
    const dateDataYear = Number(new Date(dateData).getFullYear())

    if( dateDataYear > currentYear) {
        return true
    }
    else if(dateDataYear === currentYear){
        if(dateDataMonth > currentMonth){
            return true
        }
        else if( dateDataMonth === currentMonth && dateDataPlus1 > currentDate) {
            return true
        }
    }

    return false
}