import './taskid.css'

export default function TaskID({ taskNum, setTaskNum}) {


    return(
        <>
        <div className="task-outer-div">
            TASK ID
            <input className="task-input" type="number" />
        </div>
        </>
    )
}