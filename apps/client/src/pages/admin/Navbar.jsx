import { Navbar } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export default function NavigationBar () {
    const navigate = useNavigate();

    const handleLink = () => {
        navigate('/admin/userProfileUpdate');
    }

    return (
        <>
            <Navbar>
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <p><b>Username</b></p>
                        <p>kenzon</p>
                    </li>
                    <li className="nav-item">
                        <p><b>Full name</b></p>
                        <p>Firstname Lastname</p>
                    </li>
                    <li className="nav-item">
                        <p><b>NRIC/FIN</b></p>
                        <p>S1234567E</p>
                    </li>
                    <li className="nav-item">
                        <p><b>Email Address</b></p>
                        <p>kn@email.com</p>
                    </li>
                    <li className="nav-item">
                        <p><b>Date of Birth</b></p>
                        <p>24 November 1996</p>
                    </li>
                    <li className="nav-item">
                        <p><b>Mobile No.</b></p>
                        <p>98765432</p>
                    </li>
                </ul>

                <button type="button" className="btn btn-primary" onClick={handleLink}>Update User Profile</button>

            </Navbar>
            <div className="appt-info body">

            </div>
        </>
    )
}