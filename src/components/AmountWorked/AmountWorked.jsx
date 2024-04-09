import './amount-worked.css'
import { getTeammateRecord } from '../../helpers/airTableGetJobcodes'
import { useEffect, useState } from 'react'

export default function AmountWorked({ userRecordID }) {
    const [dayAmount, setDayAmount] = useState()
    const [weekAmount, setWeekAmount] = useState();
    const [payPeriodAmount, setPayPeriodAmount] = useState()
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTeammateHoursWorked = async () => {
            try {
                const record = await getTeammateRecord(userRecordID);
                let hoursToday = record.fields["Today (Sum)"]
                let hoursThisWeek = record.fields["This Week (Sum)"]
                let hoursThisPP = record.fields["This Pay Period (Sum)"]
                setDayAmount(hoursToday)
                setWeekAmount(hoursThisWeek)
                setPayPeriodAmount(hoursThisPP)
            } catch (error) {
                console.error("Failed to fetch teammate photo:", error);
            }
            finally {
                setLoading(false)
            }
        }
        if (userRecordID) {
            fetchTeammateHoursWorked();
        }
    }, [userRecordID, loading])

    return (
        <>
            <div className="data-container">
                <div className="data-div">
                    <div className="data-label day-label">DAY</div>
                    <div className="data-value day-value">
                        {!loading ? dayAmount : " -:-- "}
                    </div>
                </div>
                <div className="data-div">
                    <div className="data-label week-label">WEEK</div>
                    <div className="data-value week-value">
                        {!loading ? weekAmount : " -:-- "}
                    </div>
                </div>
                <div className="data-div">
                    <div className="data-label pp-label">PAY PERIOD</div>
                    <div className="data-value pp-value">
                        {!loading ? payPeriodAmount : " -:-- "}
                    </div>
                </div>
            </div>
        </>
    )
}