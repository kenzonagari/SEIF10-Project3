import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function CreateProfile () {
    const [error, setError] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        let myFormData = new FormData(event.target);
        let userLoginObj = Object.fromEntries(myFormData.entries());
        let loginIsValid = false;

        //conditionals

        if(userLoginObj.medAllergies === ""){
            userLoginObj.medAllergies = "NA";
        }

        if(userLoginObj.pastIllnesses === ""){
            userLoginObj.pastIllnesses = "NA";
        }



        console.log(userLoginObj);
        loginIsValid = true;
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
                                <Form.Control type="text" id="username" placeholder="prefilled username" />
                            </div>
                        </div>
                        <div className="col">
                            <div className="mb-3">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" id="email" placeholder="prefilled email" />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="mb-3">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" id="firstName" placeholder="prefilled first name" />
                            </div>
                        </div>
                        <div className="col">
                            <div className="mb-3">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" id="lastName" placeholder="prefilled last name" />
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
                            <Form.Control type="number" id="dateOfBirth" name="dateOfBirth" placeholder="DD" min="1" max="31" required/>
                        </div>
                        <div className="col">
                            <Form.Control type="number" id="dateOfBirth" name="dateOfBirth" placeholder="MM" min="1" max="12" required/>
                        </div>
                        <div className="col">
                            <Form.Control type="number" id="dateOfBirth" name="dateOfBirth" placeholder="YYYY" min="1900" max="2022" required/>
                        </div>
                    </div>
                </div>

                <div className='row'>
                    <div className='col'>
                        <div className="form-group col-md-8 mb-3">
                            <label className='form-label'>Sex*</label>
                            <select className="form-select mb-3" id="sex" name="sex" required>
                                <option value=""></option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="nonbinary">Non-Binary</option>
                            </select>
                        </div>
                    </div>
                    <div className='col'>
                        <div className="mb-3 md-10">
                            <Form.Label>Mobile No*</Form.Label>
                            <Form.Control type="text" id="mobile" name="mobile" placeholder="12345678" required/>
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
                        Confirm
                    </Button>
                </div>

            </Form>
        </div>
    )
}