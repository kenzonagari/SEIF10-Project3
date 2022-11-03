import { useState, useEffect } from "react"

export default function UserProfile () {
    const [toggle, setToggle] = useState(true);
    const [submit, setSubmit] = useState(false);
    const [userProfileInfo, setUserProfileInfo] = useState({});

    useEffect(() => {   
        fetch('/api/userprofile/')
            .then((response) => response.json())
            .then((data) => {
                data[0].dateOfBirth = data[0].dateOfBirth.slice(0,10);
                setUserProfileInfo(data[0]);
            });
    }, []);

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

        <div className="card m-4 p-3" style={{ "width": "50rem", "height": "fit-content" }}>
            
            <div className="card-body">
                <h2 className="card-title mb-4">Home</h2>
                <p className="mb-3">Name: {`${userProfileInfo?.loginInfo?.firstname} ${userProfileInfo?.loginInfo?.lastname}`}</p>
                <p className="mb-3">NRIC/FIN: {userProfileInfo?.ic}</p>
                <p className="mb-3">Date of Birth: {userProfileInfo?.dateOfBirth}</p>
                <p className="mb-3">Sex: {userProfileInfo?.sex}</p>
                <p className="mb-3">Medication Allergies: {userProfileInfo?.medAllergies}</p>
                <p className="mb-3">Past Illnesses: {userProfileInfo?.pastIllnesses}</p>

                <div className="bg-secondary p-3 rounded-2" style={{"--bs-bg-opacity": .1}}>
                    <div className="mb-3">
                        <label htmlFor="email" className="mb-1">Email address:</label>
                        <input type="email" className={`form-control ${submit ? "" : "text-muted"}`} id="email" defaultValue={userProfileInfo?.loginInfo?.email} readOnly={toggle}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="mobile" className="mb-1">Mobile No:</label>
                        <input type="text" className={`form-control ${submit ? "" : "text-muted"}`} id="mobile" defaultValue={userProfileInfo?.mobile} readOnly={toggle}/>
                    </div>
                    <div className="mb-3">
                        <button type="submit" className={`btn ${submit ? "btn-primary": "btn-secondary"}`} onClick={handleToggle}>{submit? "Submit" : "Update"}</button>
                    </div>
                </div>

            </div>
        </div>

    )
}