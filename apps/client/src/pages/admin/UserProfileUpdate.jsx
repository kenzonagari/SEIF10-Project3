import { Form, Button } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import HeaderFunction from "./Header";

export default function UserProfileUpdate () {

    const navigate = useNavigate();
    const { userProfileId } = useParams();
    const [error, setError] = useState("");
    const [disableButton, setDisableButton] = useState(false);
    const [userProfileInfo, setUserProfileInfo] = useState({});

    useEffect(() => {
        fetch(`/api/userprofile/admin/${userProfileId}`)
            .then((response) => response.json())
            .then((data) => {
                setUserProfileInfo(data);
            });
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        setDisableButton(true);

        let myFormData = new FormData(event.target);
        let userProfileObj = Object.fromEntries(myFormData.entries());

        //conditionals

        if(userProfileObj.medAllergies === ""){
            userProfileObj.medAllergies = "NA";
        }

        if(userProfileObj.pastIllnesses === ""){
            userProfileObj.pastIllnesses = "NA";
        }

        if(userProfileObj.sex === ""){
            userProfileObj.sex = "Not specified";
        }

        //refactor DOB
        userProfileObj.dateOfBirth = `${userProfileObj.year}` + '-' + `${userProfileObj.month}` + '-' + `${userProfileObj.date}`;
        delete userProfileObj.date;
        delete userProfileObj.month;
        delete userProfileObj.year;

        // console.log(userProfileObj)
        //PUT
        fetch(`/api/userprofile/admin/${userProfileId}`, {  method: "PUT", 
                                                            headers: {
                                                                "Content-type": "application/json" //* vvvvv important, otherwise server receives empty object
                                                            },
                                                            body: JSON.stringify(userProfileObj) 
                                                        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if(data.msg === "Redirecting to /admin/home"){
                    setError("");
                    return navigate(`/admin/home`);
                } else {
                    setError("Server error");
                    setDisableButton(false);
                    return;
                }
            });
    }

    const dateOption = [];
    const monthOption = [];
    const yearOption = [];

    for(let i = 1; i <= 31 ; i++){
        dateOption.push(
            <option value={`${i}`} key={`${i}`}>{`${i}`}</option>
        );
        if(i <= 12){
            monthOption.push(
                <option value={`${i}`} key={`${i}`}>{`${i}`}</option>
            );
        }
    }

    for(let i = 2022; i > 1900 ; i--){
        yearOption.push(
            <option value={`${i}`} key={`${i}`}>{`${i}`}</option>
        );
    }

    return (
        <div className="body">
            <HeaderFunction />

            <div className="card m-4 p-5 mx-auto" style={{ width: "50rem" }}>

                <div className="mb-3 text-center">
                    <h1>Update Patient Profile</h1>
                </div>

                <Form onSubmit={handleSubmit}>

                    <fieldset className="bg-secondary bg-opacity-10 p-3 mb-3 rounded-3" disabled>
                        <div className="row">
                            <div className="col">
                                <div className="mb-3">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="text" id="username" name="username" defaultValue={userProfileInfo?.loginInfo?.username} />
                                </div>
                            </div>
                            <div className="col">
                                <div className="mb-3">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" id="email" name="email" defaultValue={userProfileInfo?.loginInfo?.email} />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="mb-3">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control type="text" id="firstname" name="firstname" defaultValue={userProfileInfo?.loginInfo?.firstname} />
                                </div>
                            </div>
                            <div className="col">
                                <div className="mb-3">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control type="text" id="lastname" name="lastname" defaultValue={userProfileInfo?.loginInfo?.lastname} />
                                </div>
                            </div>
                        </div>
                    </fieldset>

                    <div className="mb-3">
                        <Form.Label>Date Of Birth*</Form.Label>
                        <div className="row">
                            <div className="col">
                                <select className="form-select mb-3" id="date" name="date" required>
                                    <option value={parseInt(userProfileInfo?.dateOfBirth?.slice(8,10)).toString()}>{parseInt(userProfileInfo?.dateOfBirth?.slice(8,10)).toString()}</option>
                                    {dateOption}
                                </select>
                            </div>
                            <div className="col">
                                <select className="form-select mb-3" id="month" name="month" required>
                                    <option value={parseInt(userProfileInfo?.dateOfBirth?.slice(5,7)).toString()}>{parseInt(userProfileInfo?.dateOfBirth?.slice(5,7)).toString()}</option>
                                    {monthOption}
                                </select>
                            </div>
                            <div className="col">
                                <select className="form-select mb-3" id="year" name="year" required>
                                    <option value={parseInt(userProfileInfo?.dateOfBirth?.slice(0,4)).toString()}>{parseInt(userProfileInfo?.dateOfBirth?.slice(0,4)).toString()}</option>
                                    {yearOption}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col'>
                            <div className="form-group mb-3">
                                <label className='form-label'>Sex*</label>
                                <select className="form-select mb-3" id="sex" name="sex" required>
                                    <option value={userProfileInfo?.sex}>{userProfileInfo?.sex}</option>
                                    <option value="M">Male</option>
                                    <option value="F">Female</option>
                                    <option value="NB">Non-Binary</option>
                                </select>
                            </div>
                        </div>
                        <div className='col'>
                            <div className="mb-3 md-10">
                                <Form.Label>Mobile No*</Form.Label>
                                <Form.Control type="text" id="mobile" name="mobile" defaultValue={userProfileInfo?.mobile} required/>
                            </div>
                        </div>
                        <div className='col'>
                            <div className="mb-3 md-10">
                            <Form.Label>NRIC/FIN*</Form.Label>
                            <Form.Control type="text" id="ic" name="ic" defaultValue={userProfileInfo?.ic} required/>
                        </div>
                    </div>
                    </div>
                
                    <div className="mb-3">
                        <Form.Label>Medication Allergies</Form.Label>
                        <textarea className="form-control" type="text" id="medAllergies" name="medAllergies" defaultValue={userProfileInfo?.medAllergies} />
                    </div>

                    <div className="mb-3">
                        <Form.Label>Past Illnesses</Form.Label>
                        <textarea className="form-control" type="text" id="pastIllnesses" name="pastIllnesses" defaultValue={userProfileInfo?.pastIllnesses} />
                    </div>
            
                    <div className="mt-5 mb-3 text-center d-flex justify-content-around">
                        <Button variant="primary" type="submit" disabled={disableButton}>
                            Update Profile
                        </Button>
                        <Button variant="danger" type="button" disabled={disableButton}>
                            Delete Profile
                        </Button>
                    </div>

                </Form>
            </div>
        </div>
    )
}