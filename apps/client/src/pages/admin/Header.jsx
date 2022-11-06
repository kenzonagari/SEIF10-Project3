import { Navbar } from 'react-bootstrap'

export default function HeaderFunction ({userProfileInfo}) {

    const firstInitial = userProfileInfo?.loginInfo?.firstname.slice(0,1);
    const lastInitial = userProfileInfo?.loginInfo?.lastname.slice(0,1);
    const initial = (firstInitial && lastInitial) ? `${firstInitial}${lastInitial}` : "";

    return(
        <Navbar className="navbar-expand-lg bg-secondary d-flex flex-wrap justify-content-between align-items-center" style={{"--bs-bg-opacity": .1}}>
            <div className="container-fluid">
                <a className="navbar-brand h1 mx-4 my-0" href="#">
                    <h2>
                        HealthcarePal
                    </h2>
                </a>
                <div className='dropdown'>
                    <ul className="navbar-nav">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle navbar-brand h1 mx-4 my-0 d-flex flex-row align-items-center" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <h5>Hi, Admin!</h5>
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDarkDropdownMenuLink">
                                <li><a className="dropdown-item" href="/signout">Sign Out</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </Navbar>
    )
}