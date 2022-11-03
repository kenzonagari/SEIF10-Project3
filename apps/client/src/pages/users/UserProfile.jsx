import { useState, useEffect } from "react"
import { Form, Button } from 'react-bootstrap';

export default function UserProfile ({userProfileInfo}) {
    const [submit, setSubmit] = useState(true);
    const [defaultData, setDefaultData] = useState({email: userProfileInfo?.loginInfo?.email, mobile: userProfileInfo?.loginInfo?.mobile});

    const handleToggle = () => {
        if(!submit){
            setSubmit(true);
        } else {
            setSubmit(false);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setSubmit(true);

        let myFormData = new FormData(event.target);
        let userProfileObj = Object.fromEntries(myFormData.entries());

        //PUT
        if(userProfileObj.email && userProfileObj.mobile){
            fetch(`/api/userprofile/${userProfileInfo._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userProfileObj),
            })
            .then((response) => response.json())
            .then((data) => {
                setDefaultData({email: userProfileObj.email, mobile: userProfileObj.mobile});
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }
        
    }

    const updateBtn = <Button type="reset" className="btn btn-secondary" onClick={handleToggle}>{submit ? "Update" : "Cancel"}</Button>;
    const submitBtn = <Button variant="primary" type="submit" className="btn btn-primary mx-4">Submit</Button>;

    return (

        <div className="card m-4 p-3" style={{ "width": "50rem", "height": "fit-content" }}>
            
            <div className="card-body">

                <h2 className="card-title mb-4">Home</h2>

                <table className="table table-borderless w-50">
                    <tbody>
                        <tr>
                            <th scope="row">Name</th>
                            <td>{userProfileInfo?.loginInfo?.firstname} {userProfileInfo?.loginInfo?.lastname}</td>
                        </tr>
                        <tr>
                            <th scope="row">NRIC/FIN</th>
                            <td>{userProfileInfo?.ic}</td>
                        </tr>
                        <tr>
                            <th scope="row">Date of Birth</th>
                            <td>{userProfileInfo?.dateOfBirth}</td>
                        </tr>
                        <tr>
                            <th scope="row">Sex</th>
                            <td>{userProfileInfo?.sex}</td>
                        </tr>
                        <tr>
                            <th scope="row">Medication Allergies</th>
                            <td>{userProfileInfo?.medAllergies}</td>
                        </tr>
                        <tr>
                            <th scope="row">Past Illnesses</th>
                            <td>{userProfileInfo?.pastIllnesses}</td>
                        </tr>
                    </tbody>
                </table>

                <div className="bg-secondary p-3 rounded-2" style={{"--bs-bg-opacity": .1}}>
                    <Form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <Form.Label htmlFor="email" className="mb-1">Email address:</Form.Label>
                            <Form.Control type="email" className={`form-control ${!submit ? "" : "form-control-plaintext"}`} id="email" name="email" defaultValue={defaultData.email ? defaultData.email : userProfileInfo?.loginInfo?.email} required={true}/>
                        </div>
                        <div className="mb-3">
                            <Form.Label htmlFor="mobile" className="mb-1">Mobile No:</Form.Label>
                            <Form.Control type="text" className={`form-control ${!submit ? "" : "form-control-plaintext"}`} id="mobile" name="mobile" defaultValue={defaultData.mobile ? defaultData.mobile : userProfileInfo?.mobile} required={true}/>
                        </div>
                        <div className="mb-3 d-flex flex-wrap justify-content-start">
                            {updateBtn}
                            {!submit ? submitBtn : ""}
                        </div>
                    </Form>

                </div>

            </div>
        </div>

    )
}