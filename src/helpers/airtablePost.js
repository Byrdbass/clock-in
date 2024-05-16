import Airtable from "airtable";
const apiKey =
  import.meta.env.VITE_AIRTABLE_API_KEY || process.env.VITE_AIRTABLE_API_KEY;
const timeSheetHoursBase = "apps7roRhnziLR2ou";

let base = new Airtable({ apiKey: `${apiKey}` }).base(`${timeSheetHoursBase}`);

export function createTimeEntry(
  notes,
  startDateTime,
  jobcode3,
  userRecordID,
  projectRecordId,
  duration,
  endDateTime
) {
  return new Promise((resolve, reject) => {
    if (userRecordID === "" || userRecordID === null) {
      userRecordID = "recz0x2YIqlsm6vQR";
    }
    base("Timesheet_Hours").create(
      [
        {
          fields: {
            Team_Member: [`${userRecordID}`],
            Start_Time_Manual: startDateTime,
            // "Start_Time_Manual_test": `${startDateTime}`,
            // Date_of_Timesheet: `${startDateTime}`,
            End_Time_Manual: endDateTime,
            End_Time_Manual_test: endDateTime,
            Product_Jobcode3: [`${projectRecordId}`],
            Product_Jobcode3_fallback: `${jobcode3}`,
            Notes: `${notes}`,
            Intended_Duration: duration,
          },
        },
      ],
      function (err, records) {
        if (err) {
          console.error(err);
          reject(err);
          return;
        }
        if (records && records.length > 0) {
          resolve(records[0].getId());
        }
      }
    );
  });
}
