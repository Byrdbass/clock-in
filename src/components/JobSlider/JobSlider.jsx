import './jobslider.css'
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
    
    useEffect(()=> {
        handleJobCodeList(jobCodeList)
    })

    return (
        <div className={``}>
            <div className={`row toggle ${colorChange}`}>
                <div className='col'>
                    <p>Recent Job Codes</p>
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
                    <p>All Job Codes</p>
                </div>
            </div>
        </div>
    )
}