import { Navbar } from 'react-bootstrap'

export default function HeaderFunction () {

    return(
        <Navbar className="navbar-expand-lg bg-secondary d-flex flex-wrap justify-content-between align-items-center" style={{"--bs-bg-opacity": .1}}>
            <div className="container-fluid">
                <a className="navbar-brand h1 mx-4 my-0" href="/admin/home">
                    <p className="fw-bold text-center" style={{fontSize: "2em", color:"#FD6666"}}>HealthcarePal</p>
                </a>
                <div className='dropdown'>
                    <ul className="navbar-nav">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle navbar-brand h1 mx-4 my-0 d-flex flex-row align-items-center" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <h5>Hi, Admin!</h5>
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDarkDropdownMenuLink">
                            <li><a className="dropdown-item" href="/admin/home">Home</a></li>
                                <li><a className="dropdown-item" href="/signout">Sign Out</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </Navbar>
    )
}