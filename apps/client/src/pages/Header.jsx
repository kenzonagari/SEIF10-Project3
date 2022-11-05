import { Navbar } from 'react-bootstrap'

export default function HeaderFunction ({userProfileInfo}) {

    const firstInitial = userProfileInfo?.loginInfo?.firstname.slice(0,1);
    const lastInitial = userProfileInfo?.loginInfo?.lastname.slice(0,1);
    const initial = (firstInitial && lastInitial) ? `${firstInitial}${lastInitial}` : "";

    return(
        <Navbar className="bg-secondary d-flex flex-wrap justify-content-between align-items-center" style={{"--bs-bg-opacity": .1}}>

            <a className="navbar-brand h1 mx-4 my-0" href="#">
                <h1>
                    HealthcarePal
                </h1>
            </a>
            <a className="navbar-brand h1 mx-4 my-0 d-flex flex-direction-row align-items-center" href="#">
                <h5>{userProfileInfo?.loginInfo?.username}</h5>
                <div className="rounded-circle text-white fs-5 mx-2 text-center" style={{"width": "50px", "height": "50px", "lineHeight":"45px", "background":"#d63384"}}>
                   {initial}
                </div>
            </a>

        </Navbar>
    )
}