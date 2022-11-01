import { Card, Form, Button } from 'react-bootstrap'


export default function CreateProfile () {

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
        <div className="card m-4 p-5" style={{ width: "60rem" }}>

            <div className="mb-3">
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
                    <Form.Label>Date Of Birth</Form.Label>
                    <Form.Control type="text" id="dateOfBirth" name="dateOfBirth" placeholder="date of birth" required/>
                </div>
        
                <div className="form-group col-md-4 mb-3">
                    <label className='form-label'>Sex</label>
                    <select className="form-select mb-3" id="sex" name="sex" required>
                        <option value=""></option>
                        <option value="male">M</option>
                        <option value="female">F</option>
                        <option value="nonbinary">Non-Binary</option>
                    </select>
                </div>
            
                <div className="mb-3">
                    <Form.Label>Mobile No.</Form.Label>
                    <Form.Control type="text" id="mobile" name="mobile" placeholder="12345678" required/>
                </div>

                <div className="mb-3">
                    <Form.Label>Medication Allergies</Form.Label>
                    <textarea className="form-control" type="text" id="medAllergies" name="medAllergies" defaultValue="NA" />
                </div>

                <div className="mb-3">
                    <Form.Label>Past Illnesses</Form.Label>
                    <textarea className="form-control" type="text" id="pastIllnesses" name="pastIllnesses" defaultValue="NA" />
                </div>
         
                <div className="mb-3">
                    <Button variant="primary" type="submit" disabled={false}>
                        Confirm
                    </Button>
                </div>

            </Form>
        </div>
    )
}