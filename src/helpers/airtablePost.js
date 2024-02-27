// const Airtable = require('airtable');
// const apiKey = import.meta.env.VITE_AIRTABLE_API_KEY;

// if(import.meta.env.MODE === 'development'){
    
// }
// else {
//     import.meta.env.airtableApiKey;
// }
// Airtable.configure({
//     endpointUrl: 'https://api.airtable.com',
//     apiKey: apiKey,
// });

base = Airtable.base('apps7roRhnziLR2ou');

// export function createTimeEntry() {
//     base('Timesheet_Hours').create([
//         {
//             "fields": {
//                 "Team_Member" : [ "recMhLRHRvxzjIHpn" ],
//                 "Start_Time_Manual": "2023-12-01T16:38:00.000Z",
//                 "End_Time_Manual": "2023-12-01T17:29:00.000Z",
//                 "Notes": "test entry!",
//             }
//         }
//     ])
// }