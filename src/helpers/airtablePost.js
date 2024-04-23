import Airtable from "airtable";
const apiKey =
  import.meta.env.VITE_AIRTABLE_API_KEY || process.env.VITE_AIRTABLE_API_KEY;
const timeSheetHoursBase = "apps7roRhnziLR2ou";

let base = new Airtable({ apiKey: `${apiKey}` }).base(`${timeSheetHoursBase}`);

export function createTimeEntry(
  notes,
  date,
  startTime,
  jobcode3,
  userRecordID,
  projectRecordId,
  duration,
  endTime,
  endDate
) {
  return new Promise((resolve, reject) => {
    if (userRecordID === "" || userRecordID === null) {
      userRecordID = "recz0x2YIqlsm6vQR";
    }
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    console.log(`${date}T${startTime}`);
    let startDateTime = new Date(`${date}T${startTime}:00Z`); // UTC format
    // TODO: THIS IS AN "INVALID DATE" due to seconds being added?
    const timezoneOffsetHours = startDateTime.getTimezoneOffset() / 60;
    // startDateTime.setHours(startDateTime.getHours() - timezoneOffsetHours);
    const startDateTimeString = startDateTime.setHours(
      startDateTime.getHours() + timezoneOffsetHours
    );
    let endDateTime = new Date(`${endDate}T${endTime}:00Z`); // UTC format
    const endDateTimeString = endDateTime.setHours(
      endDateTime.getHours() + timezoneOffsetHours
    );
    console.log(startDateTime);
    console.log(endDateTimeString);
    base("Timesheet_Hours").create(
      [
        {
          fields: {
            Team_Member: [`${userRecordID}`],
            Start_Time_Manual: startDateTimeString,
            // "Start_Time_Manual_test": `${startDateTime}`,
            Date_of_Timesheet: `${date}`,
            End_Time_Manual: endDateTime,
            End_Time_Manual_test: endDateTimeString,
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
      });
  });
}
