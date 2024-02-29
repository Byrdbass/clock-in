import '../../App.css'
import { getTeammateRecord } from '../../helpers/airTableGetJobcodes';
import { useEffect, useState } from 'react'

export default function JobCodes({ jobcode3, setJobcode3, userRecordID }) {

    const [recentJobCodes, setRecentJobCodes] = useState('');
    const [allJobCodes, setAllJobCodes] = useState('');
    
    useEffect(() => {
        const fetchTeammateRecord = async () => {
          try {
              // getRecordFields()
                const recordFields = await getTeammateRecord(userRecordID);
                setRecentJobCodes(recordFields.Recently_Used_Jobcodes)
                console.log(recentJobCodes)
                console.log(recordFields); // Use recordId as needed
            } catch (error) {
                console.error("Failed to fetch teammate record:", error);
                // Handle error (e.g., update state to show an error message)
            }
        };
        
        if (userRecordID) {
          fetchTeammateRecord();
        }
      }, [userRecordID]);

    return(
        <div className="inputSection">
        <div className="header">Jobcode3</div>
        <select name="jobcode3" id="jobcode3">
            {recentJobCodes.map(( job, index ) => {
                return (
                    <option key={index}>
                        {job}
                    </option>
                )
            })}
        </select>
        <input
          type="text"
          id="jobcode3Field"
          placeholder="Jobcode3"
          style={{ fontSize: '1em' }}
          value={jobcode3}
          onChange={(e) => setJobcode3(e.target.value)}
        />
      </div>
    )
}