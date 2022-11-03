import { Navbar } from 'react-bootstrap'

export default function HeaderFunction () {
    return(
        <Navbar className="bg-secondary d-flex flex-wrap justify-content-between align-items-center" style={{"--bs-bg-opacity": .1}}>

            <a className="navbar-brand h1 mx-4 my-0" href="#">
                <h2>
                    HealthcarePal
                </h2>
            </a>
            <a className="navbar-brand h1 mx-4 my-0" href="#">Username</a>

        </Navbar>
    )
}