import '../../App.css'
import { getTeammateRecord } from '../../helpers/airTableGetJobcodes';
import { useEffect, useState } from 'react'
import JobSlider from '../JobSlider/JobSlider';

export default function JobCodes({ jobcode3, setJobcode3, userRecordID }) {

    const [loading, setLoading] = useState(true)
    const [recentJobCodes, setRecentJobCodes] = useState([]);
    const [allJobCodes, setAllJobCodes] = useState([]);

    
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
            } finally {
              setLoading(false)
            }

        };
        
        if (userRecordID) {
          fetchTeammateRecord();
        }

      }, [userRecordID]);

    return(
        <div className="inputSection">
        <label className="header">Jobcode3</label>
          <JobSlider />
        <select name="jobcode3" id="jobcode3Field" >
            {!loading ? recentJobCodes.map(( job, index ) => (
                    <option key={index}>
                        {job}
                    </option>
                )
            ) : <option>Loading...</option>}
        </select>
      </div>
    )
}