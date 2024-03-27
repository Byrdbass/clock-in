import './navbar.css'
import timeLogo from '../../assets/navbar-icons/time-integral-ed-logo.png'
import { getTeammateRecord } from '../../helpers/airTableGetJobcodes';
import { useEffect, useState } from 'react'

export default function Navbar({ userRecordID }) {
    const [photoUrl, setPhotoUrl] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTeammatePhoto = async () => {
            try {
                const record = await getTeammateRecord(userRecordID);
                let photoRecord = record.fields.Photo[0].url;
                setPhotoUrl(photoRecord)
            } catch (error) {
                console.error("Failed to fetch teammate photo:", error);
            }
            finally {
                setLoading(false)
            }
        }
        if (userRecordID) {
            fetchTeammatePhoto();
        }
    }, [userRecordID, loading])
    return (
        <>
            <div className='navbar-outer-div'>
                <div className='logo-div'>
                    <button className='time-integral-ed-logo'
                    onClick={()=> window.open("https://time.softr.app/")}
                    >
                        <img className='timeLogo' src={timeLogo} />
                    </button>

                </div>
                <div className='button-div'>

                    <button className='my-time-entries-btn' 
                    onClick={()=> window.open("https://time.softr.app/")}
                    >
                        My Time Entries
                    </button>
                    <button className='clock-in-btn'
                    onClick={()=> window.location.reload()}
                    >
                        Clock In
                    </button>
                    <div className='profile-photo'>
                        {!loading ? <img src={photoUrl} className="profile-photo-img" alt="" /> : null}
                        
                    </div>
                </div>
            </div>
        </>
    )
}