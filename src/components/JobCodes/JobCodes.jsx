import '../../App.css'
import { getProductJobCode3IDs, getTeammateRecord, getProductNameAndID } from '../../helpers/airTableGetJobcodes';
import { useEffect, useState } from 'react'
import JobSlider from '../JobSlider/JobSlider';

export default function JobCodes({ projectRecordId, setProjectRecordId, jobcode3, setJobcode3, userRecordID }) {

    const [loading, setLoading] = useState(true)
    const [jobCodes, setJobCodes] = useState([])
    const [allProductNames, setAllProductNames] = useState({})
    const [recentJobCodes, setRecentJobCodes] = useState([]);
    const [allJobCodes, setAllJobCodes] = useState([]);
    // const [projectRecordId, setProjectRecordId] = useState('')
    const [projectRecordIds, setProjectRecordIds] = useState([])
    const [projectRecordName, setProjectRecordName] = useState('')
    const [jobCodeIndex, setJobCodeIndex] = useState(0)

    useEffect(() => {
      const entry = Object.entries(allProductNames).find(([key, value]) => key.trim() === jobcode3.trim());
      if (entry) {
        const [matchedJobCode, recordId] = entry;
        setProjectRecordId(recordId)
        console.log(projectRecordId)
        console.log(`Found match for jobCode3: ${matchedJobCode} with record ID: ${recordId}`);
      } else {
        //hard code error
        setProjectRecordId("recBrwBB7eRuIDIuz")
        console.log(`No match found for jobCode3: ${jobcode3}`);
      }
    }, [jobcode3, allProductNames, projectRecordId]);

    // useEffect(() => {
    //   const fetchProductJobCode3Record = async(projectRecordId) => {
    //     const projRecordFields = await getProductJobCode3IDs(projectRecordId)
    //     // console.log(projectRecordId.ID)
    //     // console.log(projectRecordId.fields.Product_Name)
    //   }
    //   fetchProductJobCode3Record(); 
    // }, [jobCodes])

    useEffect(() => {
        const fetchTeammateRecord = async () => {
          try {
              // getRecordFields()
                const record = await getTeammateRecord(userRecordID);
                //NEEDS FIX
                let jobCodesArray = record.fields.Recently_Used_Jobcodes
                jobCodesArray.map((val, index) => {
                  // console.log(val)
                  if (val.indexOf(',')> -1){
                    let newVal = val.split(',')
                    newVal.forEach(x => {jobCodesArray.push(x)})
                    jobCodesArray.splice(index, 1)
                  }
                })
                // console.log(jobCodesArray)
                setRecentJobCodes(jobCodesArray)
                setAllJobCodes(record.fields.All_Assigned_Jobcodes_txt)
                setJobCodes(recentJobCodes) //setting initial drop down to recent job codes
                setProjectRecordIds(record.fields.Recently_Used_Jobcodes_record_ID)
                // console.log(projectRecordIds)
                // console.log(recordFields.Recently_Used_Jobcodes_record_ID); 
                // console.log(recordFields.All_Assigned_Jobcodes_record_ID); 
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

      useEffect(()=> {
          const fetchproductNameAndID = async() => {
            const listOfProductNames = await getProductNameAndID()
            setAllProductNames(listOfProductNames)
          }          
          fetchproductNameAndID()
      }, [loading])

      const handleJobCodeList = (prevOption) => {
        setJobCodes(prevOption === "Recent Job Codes" ? recentJobCodes : allJobCodes)
      }

      const handleSelectChange = (e) => {
        const selectedIndex = e.target.selectedIndex;
        setJobCodeIndex(selectedIndex); 
        setJobcode3(e.target.value.trim()); 
        // console.log(jobcode3, jobCodeIndex, projectRecordId)
    };
    
    return(
        <div className="inputSection">
        <label className="header">Jobcode3</label>
          <JobSlider 
          handleJobCodeList={handleJobCodeList}
          />
        <select name="jobcode3" id="jobcode3Field" 
        value={jobcode3}
        onChange={handleSelectChange}>
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