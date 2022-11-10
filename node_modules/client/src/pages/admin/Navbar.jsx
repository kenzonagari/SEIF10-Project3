import { Navbar } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export default function NavigationBar ({userProfileInfo}) {
    const navigate = useNavigate();

    const handleLink = () => {
        navigate(`/admin/userProfileUpdate/${userProfileInfo._id}`);
    }

    return (
        <>
        <div className="d-flex flex-column flex-shrink-0 p-3 bg-light" style={{ "width": "fit-content" }}>
            <Navbar className='d-flex flex-column justify-content-start align-items-start p-3'>
                <ul className="nav nav-pills flex-column mb-auto">
                    <div className='mb-3'>
                        <li className="nav-item">
                            <p><b>Full name</b></p>
                            <p>{userProfileInfo?.loginInfo?.firstname} {userProfileInfo?.loginInfo?.lastname}</p>
                        </li>
                    </div>
                    <div className='mb-3'>
                        <li className="nav-item">
                            <p><b>Date of Birth</b></p>
                            <p>{userProfileInfo?.dateOfBirth?.slice(0,10)}</p>
                        </li>
                    </div>
                    <div className='mb-3'>
                        <li className="nav-item">
                            <p><b>Medication Allergies</b></p>
                            <p>{userProfileInfo?.medAllergies}</p>
                        </li>
                    </div>
                    <div className='mb-3'>
                        <li className="nav-item">
                            <p><b>Past Illnesses</b></p>
                            <p>{userProfileInfo?.pastIllnesses}</p>
                        </li>
                    </div>
                    <div className='mb-3'>
                        <li className="nav-item">
                            <p><b>NRIC/FIN</b></p>
                            <p>{userProfileInfo?.ic}</p>
                        </li>
                    </div>
                    <div className='mb-3'>
                        <li className="nav-item">
                            <p><b>Email Address</b></p>
                            <p>{userProfileInfo?.loginInfo?.email}</p>
                        </li>
                    </div>
                    <div className='mb-3'>
                        <li className="nav-item">
                            <p><b>Mobile No.</b></p>
                            <p>{userProfileInfo?.mobile}</p>
                        </li>
                    </div>
                </ul>

                <button type="button" className="btn btn-primary" onClick={handleLink}>Update Patient Profile</button>

            </Navbar>
        </div>
        </>
    )
}