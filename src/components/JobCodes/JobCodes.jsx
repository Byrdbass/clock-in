import '../../App.css'
import { useEffect } from 'react'

export default function JobCodes({ jobcode3, setJobcode3, userRecordID }) {
    
    return(
        <div className="inputSection">
        <div className="header">Jobcode3</div>
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