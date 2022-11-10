export default function CoverPage () {
    return(
        <>
        <div className="d-flex text-center text-white">
            <div className="cover-container d-flex w-100 p-3 mx-auto my-auto flex-column align-items-center" 
                style={{    height: "100vh", 
                            background:"#FD6666", 
                            backgroundImage: "linear-gradient(#FD6666, #FF8080, #FFE3E3"
            }}>
                <main className="px-3 mt-5 py-5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="75" height="75" fill="currentColor" className="bi bi-hospital" viewBox="0 0 16 16">
                        <path d="M8.5 5.034v1.1l.953-.55.5.867L9 7l.953.55-.5.866-.953-.55v1.1h-1v-1.1l-.953.55-.5-.866L7 7l-.953-.55.5-.866.953.55v-1.1h1ZM13.25 9a.25.25 0 0 0-.25.25v.5c0 .138.112.25.25.25h.5a.25.25 0 0 0 .25-.25v-.5a.25.25 0 0 0-.25-.25h-.5ZM13 11.25a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25v-.5Zm.25 1.75a.25.25 0 0 0-.25.25v.5c0 .138.112.25.25.25h.5a.25.25 0 0 0 .25-.25v-.5a.25.25 0 0 0-.25-.25h-.5Zm-11-4a.25.25 0 0 0-.25.25v.5c0 .138.112.25.25.25h.5A.25.25 0 0 0 3 9.75v-.5A.25.25 0 0 0 2.75 9h-.5Zm0 2a.25.25 0 0 0-.25.25v.5c0 .138.112.25.25.25h.5a.25.25 0 0 0 .25-.25v-.5a.25.25 0 0 0-.25-.25h-.5ZM2 13.25a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25v-.5Z"/>
                        <path d="M5 1a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1a1 1 0 0 1 1 1v4h3a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h3V3a1 1 0 0 1 1-1V1Zm2 14h2v-3H7v3Zm3 0h1V3H5v12h1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3Zm0-14H6v1h4V1Zm2 7v7h3V8h-3Zm-8 7V8H1v7h3Z"/>
                    </svg>
                    <p className="fw-bold" style={{fontSize: "4em"}}>HealthcarePal</p>
                    <p className="lead">A one-stop app for <b>patients</b> and <b>healthcare administrators</b>.</p>
                </main>
                <div className="d-flex flex-row justify-content-around text-center" style={{width: "40%"}}>
                    <a href="/signup" style={{textDecoration: "none", color: "white"}}><p className="fs-5 fw-bold p-4 rounded-3 bg-light bg-opacity-10">Sign Up</p></a>
                    <a href="/signin" style={{textDecoration: "none", color: "white"}}><p className="fs-5 fw-bold p-4 rounded-3 bg-light bg-opacity-10">Sign In</p></a>
                </div>
            </div>
        </div>
        </>
    )
}