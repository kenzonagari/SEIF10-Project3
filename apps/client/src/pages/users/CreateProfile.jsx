import { Form, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


export default function CreateProfile () {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [disableButton, setDisableButton] = useState(false);
    const [userLoginInfo, setUserLoginInfo] = useState({});

    useEffect(() => {   
        fetch('/api/userlogin/')
            .then((response) => response.json())
            .then((data) => {
                setUserLoginInfo(data[0]);
            });
    }, []);

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

        //POST
        fetch('/api/userprofile', {   method: "POST", 
                                    headers: {
                                        "Content-type": "application/json" //* vvvvv important, otherwise server receives empty object
                                    },
                                    body: JSON.stringify(userProfileObj) 
                                })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if(data.msg === "Redirecting to /home"){
                    setError("");
                    return navigate("/home");
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

    return(
        <div className="card m-4 p-5 mx-auto" style={{ width: "50rem" }}>

            <div className="mb-3 text-center">
                <h1>Complete Your Profile</h1>
            </div>

            <Form onSubmit={handleSubmit}>

                <fieldset disabled>
                    <div className="row">
                        <div className="col">
                            <div className="mb-3">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" id="username" placeholder={`${userLoginInfo?.username ? userLoginInfo.username : "username"}`} />
                            </div>
                        </div>
                        <div className="col">
                            <div className="mb-3">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" id="email" placeholder={`${userLoginInfo?.email ? userLoginInfo.email : "email"}`} />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="mb-3">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" id="firstName" placeholder={`${userLoginInfo?.firstname ? userLoginInfo.firstname : "first name"}`} />
                            </div>
                        </div>
                        <div className="col">
                            <div className="mb-3">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" id="lastName" placeholder={`${userLoginInfo?.lastname ? userLoginInfo.lastname : "last name"}`} />
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
                                {dateOption}
                            </select>
                        </div>
                        <div className="col">
                            <select className="form-select mb-3" id="month" name="month" required>
                                <option value="">MM</option>
                                {monthOption}
                            </select>
                        </div>
                        <div className="col">
                            <select className="form-select mb-3" id="year" name="year" required>
                                <option value="">YYYY</option>
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
                    <Button variant="primary" type="submit" disabled={disableButton}>
                        Confirm
                    </Button>
                </div>

            </Form>
        </div>
    )
}