export default function Toast ({msg}) {
    return(
        <>
        <div className="position-fixed bottom-0 end-0 p-3" style={{zIndex: "11"}}>
            <div id="liveToast" className="toast hide" role="alert" aria-live="assertive" aria-atomic="true">
                <div className="toast-header">
                    <img src="..." className="rounded me-2" alt="..." />
                    <strong className="me-auto">Bootstrap</strong>
                    <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div className="toast-body">
                    {msg}
                </div>
            </div>
        </div>
        </>
    )
}