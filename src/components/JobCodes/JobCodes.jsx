import '../../App.css'
import { getTeammateRecord } from '../../helpers/airTableGetJobcodes';
import { useEffect, useState } from 'react'
import JobSlider from '../JobSlider/JobSlider';

export default function JobCodes({ jobcode3, setJobcode3, userRecordID }) {

    const [loading, setLoading] = useState(true)
    const [jobCodes, setJobCodes] = useState([])
    const [recentJobCodes, setRecentJobCodes] = useState([]);
    const [allJobCodes, setAllJobCodes] = useState([]);

    
    useEffect(() => {
        const fetchTeammateRecord = async () => {
          try {
              // getRecordFields()
                const recordFields = await getTeammateRecord(userRecordID);
                setRecentJobCodes(recordFields.Recently_Used_Jobcodes)
                setAllJobCodes(recordFields.All_Assigned_Jobcodes_txt)
                setJobCodes(recentJobCodes)
                console.log(recentJobCodes)
                console.log(recordFields); 
            } catch (error) {
                console.error("Failed to fetch teammate record:", error);
            } finally {
              setLoading(false)
            }

        };
        
        if (userRecordID) {
          fetchTeammateRecord();
        }

      }, [userRecordID, loading]);

      const handleJobCodeList = (prevOption) => {
        setJobCodes(prevOption === "Recent Job Codes" ? recentJobCodes : allJobCodes)
      }

    return(
        <div className="inputSection">
        <label className="header">Jobcode3</label>
          <JobSlider 
          handleJobCodeList={handleJobCodeList}
          />
        <select name="jobcode3" id="jobcode3Field" >
            {!loading ? jobCodes.map(( job, index ) => (
                    <option key={index}>
                        {job}
                    </option>
                )
            ) : <option>Loading...</option>}
        </select>
      </div>
    )
}