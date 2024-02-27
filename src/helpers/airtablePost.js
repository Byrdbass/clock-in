import Airtable from "airtable";
const apiKey = import.meta.env.VITE_AIRTABLE_API_KEY || process.env.VITE_AIRTABLE_API_KEY;
const timeSheetHoursBase = "apps7roRhnziLR2ou"

let base = new Airtable({apiKey: `${apiKey}`}).base(`${timeSheetHoursBase}`)

export function createTimeEntry(notes, date, startTime, userRecordID) {
    if (userRecordID === "" || userRecordID === null){
        userRecordID = "recz0x2YIqlsm6vQR"
    }
    
    base('Timesheet_Hours').create([
        {
            "fields": {
                "Team_Member" : [ `${userRecordID}` ],
                "Start_Time_Manual": `${date}T${startTime}`,
                "Timesheet_Entry_Date": `${date}`,
                "End_Time_Manual": "2023-12-01T17:29:00.000Z",
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