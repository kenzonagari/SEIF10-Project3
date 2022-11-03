import { Navbar } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export default function NavigationBar () {
    const navigate = useNavigate();

    return (
        <>
        <div className="d-flex flex-column flex-shrink-0 p-3 bg-light" style={{ "width": "12rem" }}>
            <Navbar>
                <ul className="nav nav-pills flex-column mb-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="/home">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link link-dark" href="/healthProfile">Health Profile</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link link-dark" href="/bookAppointment">Book An Appointment</a>
                    </li>
                </ul>
            </Navbar>
        </div>
        </>
    )
}