import NavigationBar from "./Navbar"
import { useState } from "react"
import './body.css'

export default function Home () {
    const [toggle, setToggle] = useState(true);
    const [submit, setSubmit] = useState(false);

    const handleToggle = () => {
        if(!submit){
            setToggle(false);
            setSubmit(true);
        } else {
            setToggle(true);
            setSubmit(false);
        }
    }

    return (
        <>
        <div className="body">

            <NavigationBar />

            <div className="user-profile">
                <p>First Name: </p>
                <p>Last Name: </p>
                <p>NRIC/FIN: </p>
                <p>Date of Birth: </p>
                <p>Sex: </p>
                <p>Medication Allergies: </p>
                <p>Past Illnesses: </p>
                <label htmlFor="email">Email address:</label>
                <input type="email" className="form-control" id="email" defaultValue="Email Address" readOnly={toggle}/>
                <input type="text" className="form-control" id="mobile" defaultValue="12345678" readOnly={toggle}/>
                <button type="submit" className="btn btn-primary" onClick={handleToggle}>{submit? "Submit" : "Update"}</button>
            </div>

        </div>
        </>
    )
}