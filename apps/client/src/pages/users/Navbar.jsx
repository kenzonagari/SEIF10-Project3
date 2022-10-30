import { Navbar } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export default function NavigationBar () {
    const navigate = useNavigate();

    const handleLink = (uri) => {
        navigate(`/${uri}`);
    }

    return (
        <>
            <Navbar>
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <a className="nav-link active" onClick={() => handleLink("home")}>Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link active" onClick={() => handleLink("healthProfile")}>Health Profile</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" onClick={() => handleLink("bookAppointment")}>Book An Appointment</a>
                    </li>
                </ul>
            </Navbar>
        </>
    )
}