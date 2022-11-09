export default function CoverPage () {
    return(
        <>
        <div className="d-flex text-center text-white">
            <div className="cover-container d-flex w-100 p-3 mx-auto my-auto flex-column align-items-center" style={{height: "100vh", background:"#FD6666", backgroundImage: "linear-gradient(#FD6666, #FF8080, #FFE3E3"}}>
                <main className="px-3 mt-5 py-5">
                    <p className="fw-bold" style={{fontSize: "3em"}}>HealthcarePal</p>
                    <p className="lead">A one-stop healthcare app for patients and administrators.</p>
                </main>
                <div className="d-flex flex-row justify-content-around text-center" style={{width: "40%"}}>
                    <a href="/signup" style={{textDecoration: "none", color: "white"}}><p className="fs-3 fw-light p-4 rounded-3 bg-light bg-opacity-10">Sign Up</p></a>
                    <a href="/signin" style={{textDecoration: "none", color: "white"}}><p className="fs-3 fw-light p-4 rounded-3 bg-light bg-opacity-10">Sign In</p></a>
                </div>
            </div>
        </div>
        </>
    )
}