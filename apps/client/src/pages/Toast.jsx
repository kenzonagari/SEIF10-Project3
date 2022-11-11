import { Toast } from "react-bootstrap"
import { useState } from "react";

export default function ToastElement ({msg}) {
    const [show, setShow] = useState(true);

    return(
        <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
            <div className="toast-header" style={{background:"#FD6666"}}>
                <strong className="me-auto" style={{color:"white"}}>Notification</strong>
                <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div className="toast-body">
                {msg}
            </div>
        </Toast>
    )
}