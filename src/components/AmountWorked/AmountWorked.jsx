import './amount-worked.css'
import { useEntry } from '../../utils/EntryProvider'

export default function AmountWorked() {

    const { entry } = useEntry()

    return (
        <>
            <div className="data-container">
                <div className="data-div">
                    <div className="data-label day-label">DAY</div>
                    <div className="data-value day-value">
                        {entry.dayAmount}
                    </div>
                </div>
                <div className="data-div">
                    <div className="data-label week-label">WEEK</div>
                    <div className="data-value week-value">
                        {entry.weekAmount}
                    </div>
                </div>
                <div className="data-div">
                    <div className="data-label pp-label">PAY PERIOD</div>
                    <div className="data-value pp-value">
                        {entry.payPeriodAmount}
                    </div>
                </div>
            </div>
        </>
    )
}