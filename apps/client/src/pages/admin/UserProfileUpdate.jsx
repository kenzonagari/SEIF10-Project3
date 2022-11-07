import { Form, Button } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import HeaderFunction from "./Header";

export default function UserProfileUpdate () {

    const navigate = useNavigate();
    const { userProfileId } = useParams();
    const [userProfileInfo, setUserProfileInfo] = useState({});

    useEffect(() => {
        fetch(`/api/userprofile/admin/${userProfileId}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            });
    }, [])

    const handleLink = () => {
        navigate('/admin/userAppointment');
    }

    return (
        <div className="body">
            <HeaderFunction />

            <div className="card m-4 p-5 mx-auto" style={{ width: "50rem" }}>

                <div className="mb-3 text-center">
                    <h1>Update Patient Profile</h1>
                </div>

                <Form >

                    <fieldset>
                        <div className="row">
                            <div className="col">
                                <div className="mb-3">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="text" id="username" placeholder={`${userProfileInfo?.username ? userProfileInfo.username : "username"}`} />
                                </div>
                            </div>
                            <div className="col">
                                <div className="mb-3">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" id="email" placeholder={`${userProfileInfo?.email ? userProfileInfo.email : "email"}`} />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="mb-3">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control type="text" id="firstName" placeholder={`${userProfileInfo?.firstname ? userProfileInfo.firstname : "first name"}`} />
                                </div>
                            </div>
                            <div className="col">
                                <div className="mb-3">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control type="text" id="lastName" placeholder={`${userProfileInfo?.lastname ? userProfileInfo.lastname : "last name"}`} />
                                </div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <Form.Text className="text-muted">
                                Email us at healthcarepal@fakeemail.com to request changes to the information above
                            </Form.Text>
                        </div>
                    </fieldset>

                    <div className="mb-3">
                        <Form.Label>Date Of Birth*</Form.Label>
                        <div className="row">
                            <div className="col">
                                <select className="form-select mb-3" id="date" name="date" required>
                                    <option value="" className="text-secondary">DD</option>
                                </select>
                            </div>
                            <div className="col">
                                <select className="form-select mb-3" id="month" name="month" required>
                                    <option value="">MM</option>
                                </select>
                            </div>
                            <div className="col">
                                <select className="form-select mb-3" id="year" name="year" required>
                                    <option value="">YYYY</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col'>
                            <div className="form-group mb-3">
                                <label className='form-label'>Sex*</label>
                                <select className="form-select mb-3" id="sex" name="sex" required>
                                    <option value=""></option>
                                    <option value="M">Male</option>
                                    <option value="F">Female</option>
                                    <option value="NB">Non-Binary</option>
                                </select>
                            </div>
                        </div>
                        <div className='col'>
                            <div className="mb-3 md-10">
                                <Form.Label>Mobile No*</Form.Label>
                                <Form.Control type="text" id="mobile" name="mobile" placeholder="12345678" required/>
                            </div>
                        </div>
                        <div className='col'>
                            <div className="mb-3 md-10">
                            <Form.Label>NRIC/FIN*</Form.Label>
                            <Form.Control type="text" id="ic" name="ic" placeholder="S12345678A" required/>
                        </div>
                    </div>
                    </div>
                
                    <div className="mb-3">
                        <Form.Label>Medication Allergies</Form.Label>
                        <textarea className="form-control" type="text" id="medAllergies" name="medAllergies" defaultValue="NA" />
                    </div>

                    <div className="mb-3">
                        <Form.Label>Past Illnesses</Form.Label>
                        <textarea className="form-control" type="text" id="pastIllnesses" name="pastIllnesses" defaultValue="NA" />
                    </div>
            
                    <div className="mb-3 text-center">
                        <Button variant="primary" type="submit" disabled={false}>
                            Update Profile
                        </Button>
                    </div>

                </Form>
            </div>
        </div>
    )
}