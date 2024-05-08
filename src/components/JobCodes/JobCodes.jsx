// import '../../App.css'
import './jobcodes.css'
import '../JobSlider/jobslider.css'
import { getTeammateRecord, getProductNameAndID } from '../../helpers/airTableGetJobcodes';
import { useEffect, useState } from 'react'
import { useEntry } from '../../utils/EntryProvider';

export default function JobCodes() {

  const { entry, updateJobCodes, updateJobCodeType } = useEntry();
  const [jobCodes, setJobCodes] = useState([])
  const [selectedJobCode, setSelectedJobCode] = useState("Select a Job Code (see TASK if unsure)")
  const [jobCodeList, setJobCodeList] = useState('Recent Job Codes');
  const [colorChange, setColorChange] = useState('dark')

  useEffect(() => {
    const jobs = jobCodeList === "Recent Job Codes" ?
      entry.jobCodeRecentRecordIdArr.map(val => val.jobCode) :
      entry.jobCodeAllRecordIdArr.map(val => val.jobCode);
    setJobCodes(jobs);
    // Only listen to jobCodeList changes and entry initial load
  }, [jobCodeList, entry.jobCodeRecentRecordIdArr, entry.jobCodeAllRecordIdArr]);

  //function called on checkbox clicked or not
  const handleToggle = () => {
    const newJobCodeList = jobCodeList === "Recent Job Codes" ? "All Job Codes" : "Recent Job Codes";
    updateJobCodeType(newJobCodeList)
    setJobCodeList(newJobCodeList)
    setColorChange(prevColor => prevColor === 'dark' ? 'light' : 'dark')
  }


  const handleSelectChange = (e) => {
    setSelectedJobCode(e.target.value)
    updateJobCodes(selectedJobCode)
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
          <label className={`switch ${colorChange}`} >

            <input
              type="checkbox"
              checked={jobCodeList === 'All Job Codes'}
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
