import Airtable from "airtable";
const apiKey = import.meta.env.VITE_AIRTABLE_API_KEY || process.env.VITE_AIRTABLE_API_KEY;
const timeSheetHoursBase = "apps7roRhnziLR2ou"

let base = new Airtable({apiKey: `${apiKey}`}).base(`${timeSheetHoursBase}`)

export function createTimeEntry(notes, date, startTime, jobcode3, userRecordID, projectRecordId) {
    if (userRecordID === "" || userRecordID === null){
        userRecordID = "recz0x2YIqlsm6vQR"
    }
    
    base('Timesheet_Hours').create([
        {
            "fields": {
                "Team_Member" : [ `${userRecordID}` ],
                "Start_Time_Manual": `${date}T${startTime}`,
                "Date_of_Timesheet": `${date}`,
                // "End_Time_Manual": `${endTime}`,
                "Product_Jobcode3": [`${projectRecordId}`],
                "Product_Jobcode3_fallback": `${jobcode3}`,
                "Notes": `${notes}`,
            }
        }
    ], function(err, records) {
        if (err) {
          console.error(err);
          return;
        }
        records.forEach(function (record) {
          console.log(record.getId());
        });
    })
}