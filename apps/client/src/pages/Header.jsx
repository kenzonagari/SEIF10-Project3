import { Navbar } from 'react-bootstrap'

export default function HeaderFunction () {
    return(
        <Navbar className="bg-danger d-flex flex-wrap justify-content-between align-items-center" style={{"--bs-bg-opacity": .3}}>

            <a className="navbar-brand h1 mx-4" href="#">
                <h1>
                    HealthcarePal
                </h1>
            </a>
            <a className="navbar-brand h1 mx-4" href="#">Username</a>

        </Navbar>
    )
}