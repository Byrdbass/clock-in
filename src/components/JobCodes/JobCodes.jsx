// import '../../App.css'
import './jobcodes.css'
import '../JobSlider/jobslider.css'
import { useEffect, useState } from 'react'
import { useEntry } from '../../utils/EntryProvider';

export default function JobCodes() {

  const { entry, updateJobCodes, updateJobCodeType } = useEntry();
  const [jobCodes, setJobCodes] = useState([])
  const [selectedJobCode, setSelectedJobCode] = useState("")

  //render all vs. recent job codes
  useEffect(() => {
    const jobs = entry.jobCodeType === "Recent Job Codes" ?
      entry.jobCodeRecentRecordIdArr.map(val => val.jobCode) :
      entry.jobCodeAllAssignRecordIdArr.map(val => val.jobCode);
    setJobCodes(jobs);
    // empty quotes ensure the disabled option appears
    setSelectedJobCode(entry.jobCodeArr.jobCode || "");
  }, [entry.jobCodeType, entry.jobCodeRecentRecordIdArr, entry.jobCodeAllRecordIdArr, entry.jobCodeArr.jobCode]);


  //function called on checkbox clicked or not
  const handleToggle = () => {
    const newJobCodeList = entry.jobCodeType === "Recent Job Codes" ? "All Job Codes" : "Recent Job Codes"
    const newJobColor = entry.jobCodeColor === 'dark' ? 'light' : 'dark'
    // updateJobCodes({})
    updateJobCodeType(newJobCodeList, newJobColor)
    setSelectedJobCode("")
  }

  //function called on dropdown select
  const handleSelectChange = (e) => {
    setSelectedJobCode(e.target.value)
    updateJobCodes(e.target.value)
  };

  return (
    <div className="jobcodes-outer-div">
      <div className="jobcodes-inner-div">Bill to
        <div className="required-star">*</div>
      </div>
      <select name="jobcode3" className='jobcodes-dropdown'
        value={selectedJobCode}
        onChange={handleSelectChange}>
        <option value="" disabled>Select a Job Code (see TASK if unsure)</option>
        {jobCodes.map((job, index) => (
          <option key={index}>
            {job}
          </option>
        )
        )}
      </select>
      <div className="jobcode-slider-outer-div">
        <div className={`toggle`}>
          <label className={`switch ${entry.jobCodeColor}`} >

            <input
              type="checkbox"
              checked={entry.jobCodeType === 'All Job Codes'}
              onChange={handleToggle}
            />
            <span className='slider'>
              <div className="firstChoice">Recent</div>
              <div className="secondChoice">All</div>
            </span>
          </label>
        </div>
      </div>
    </div>
  )
}
