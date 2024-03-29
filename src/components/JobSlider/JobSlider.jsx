import './jobslider.css'
// import './jobsliderRadio.css'
import { useState, useEffect } from "react";

export default function JobSlider({ handleJobCodeList }) {
    const [jobCodeList, setJobCodeList] = useState('Recent Job Codes');
    const [colorChange, setColorChange] = useState('dark')

    const handleToggle = () => {
        console.log(jobCodeList)
        setJobCodeList(prevOption => prevOption === "Recent Job Codes" ? "All Job Codes" : "Recent Job Codes")
        setColorChange(prevColor => prevColor === 'dark' ? 'light' : 'dark')
        // handleJobCodeList(jobCodeList)
    }

    useEffect(() => {
        handleJobCodeList(jobCodeList)
    })

    return (
        <>
        {/* <div class="container">
            <div class="switches-container">
                <input type="radio" id="switchMonthly" name="switchPlan" value="Recent" checked="checked" />
                <input type="radio" id="switchYearly" name="switchPlan" value="All" />
                <label for="switchMonthly">Recent</label>
                <label for="switchYearly">All</label>
                <div class="switch-wrapper">
                    <div class="switch">
                        <div>Recent</div>
                        <div>All</div>
                    </div>
                </div>
            </div>
        </div> */}
        <div className="jobcode-slider-outer-div">
            <div className={`row toggle ${colorChange}`}>
                <div className='col'>
                    Recent
                </div>
                <label className="switch" >
                    <input
                        type="checkbox"
                        checked={jobCodeList === 'All Job Codes' }
                        onChange={handleToggle} 
                    />
                    <span className='slider round'></span>
                </label>
                <div className='col'>
                    All
                </div>
            </div>
        </div>
        </>
    )
}