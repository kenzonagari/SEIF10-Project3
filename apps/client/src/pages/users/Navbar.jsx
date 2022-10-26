import { Navbar } from 'react-bootstrap'

export default function NavigationBar () {
    return (
        <>
            <Navbar>
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <a className="nav-link active" href="#">Health Profile</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Book An Appointment</a>
                    </li>
                </ul>
            </Navbar>
        </>
    )
}