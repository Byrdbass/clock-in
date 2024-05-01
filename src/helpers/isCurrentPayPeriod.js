export function isInCurrentPayPeriod(payPeriodBegin, payPeriodEnd, entryDate) {
    return entryDate >= payPeriodBegin && entryDate <= payPeriodEnd;
}

export function isPastPayPeriod(dateData) {
    const currentDate = Number(new Date().getDate())
    const currentMonth = Number(new Date().getMonth()) + 1
    const currentYear = Number(new Date().getFullYear())
    const dateDataDayOfMonth = Number(new Date(dateData).getDate())
    // TODO:
        // WHY IS DATE DATA COMING IN AS ONE DAY EARLIER
    const dateDataPlus1 = dateDataDayOfMonth 
    const dateDataMonth = Number(new Date(dateData).getMonth()) + 1
    const dateDataYear = Number(new Date(dateData).getFullYear())
    let payPeriodStartDate, payPeriodEndDate;

    if (currentDate <= 15) {
        payPeriodStartDate = Number(new Date(currentYear, currentMonth, 1.).getDate()); 
        payPeriodEndDate = Number(new Date(currentYear, currentMonth, 15).getDate()); 
    } else {
        payPeriodStartDate = Number(new Date(currentYear, currentMonth, 16).getDate()); 
        payPeriodEndDate = Number(new Date(currentYear, currentMonth, 0).getDate()); 
    }

    // console.log(`now ${currentDate}, ${currentMonth}, ${currentYear}`)
    // console.log(`dateData ${dateDataPlus1}, ${dateDataMonth}, ${dateDataYear}`)
    // console.log(dateData)
    console.log(payPeriodStartDate, payPeriodEndDate)

    if (dateDataYear < currentYear || 
        (dateDataYear === currentYear && dateDataMonth < currentMonth) || 
        (!isInCurrentPayPeriod(payPeriodStartDate, payPeriodEndDate, dateDataPlus1))
            ) {
            return true
        }

    return false
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