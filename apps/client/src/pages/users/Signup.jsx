import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const warningText = {
    usernameTooShort: "Username must have at least 3 characters!",
    passwordMatch: "Password does not match!",
    usernameTaken: "Username already taken!",
    emailTaken: "Email already taken!"
}

export default function Signup () {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [disableButton, setDisableButton] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        setDisableButton(true);

        let myFormData = new FormData(event.target);
        let userLoginObj = Object.fromEntries(myFormData.entries());
        let loginIsValid = false;
        
        //conditionals

        if(userLoginObj.username.length < 3){
            setError(warningText.usernameTooShort);
            setDisableButton(false);
            return;
        } else 
        if(userLoginObj.password !== userLoginObj.confirmPassword){
            setError(warningText.passwordMatch);
            setDisableButton(false);
            return;
        } else {
            delete userLoginObj.confirmPassword; //remove confirmPassword from object
            loginIsValid = true;
        }
        

        //* only fire off request when input is valid:
        if(loginIsValid){
            fetch('/api/userlogin', {   method: "POST", 
                                        headers: {
                                            "Content-type": "application/json" //* vvvvv important, otherwise server receives empty object
                                        },
                                        body: JSON.stringify(userLoginObj) 
                                    })
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    if(data.msg === "Username already taken"){
                        setError(warningText.usernameTaken);
                    } else 
                    if(data.msg === "Email already taken"){
                        setError(warningText.emailTaken);
                    } else 
                    if(data.msg === "Sign up successful"){
                        setError("");
                        return navigate("/signin");
                    }
                    setDisableButton(false);
                    return;
                })
        } else {
            setError("no input");
            setDisableButton(false);
        }
    }

    const warningPopup = 
        <div id="passwordHelpBlock" className="form-text text-danger">
            {error === warningText.usernameTooShort ? error :
                error === warningText.passwordMatch ? error : 
                error === warningText.usernameTaken ? error :
                error === warningText.emailTaken ? error : ""
            }
        </div>;

    return(
        <>
            <p className="fw-bold text-center my-4" style={{fontSize: "3em", color:"#FD6666"}}>HealthcarePal</p>
            <div className="card m-4 p-4 mx-auto mb-5" style={{ width: "35rem" }}>
                <div className="mb-3 text-center">
                    <h3>Sign Up</h3>
                </div>

                <Form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col">
                            <div className="mb-3">
                                <Form.Label>First Name*</Form.Label>
                                <Form.Control type="text" id="firstname" name="firstname" placeholder="Enter first name" required/>
                            </div>
                        </div>
                        <div className="col">
                            <div className="mb-3">
                                <Form.Label>Last Name*</Form.Label>
                                <Form.Control type="text" id="lastname" name="lastname" placeholder="Enter last name" required/>
                            </div>
                        </div>
                    </div>

                    <div className="mb-3 col">
                        <Form.Label>Username*</Form.Label>
                        <br></br>
                        <p className="form-text text-muted">
                            Username must have at least 3 characters
                        </p>
                        <Form.Control type="text" id="username" name="username" placeholder="Enter username" required/>
                        {error === warningText.usernameTooShort ? warningPopup : ""}
                        {error === warningText.usernameTaken ? warningPopup : ""}
                    </div>

                    <div className="mb-3">
                        <Form.Label>Email Address*</Form.Label>
                        <Form.Control type="email" id="email" name="email" placeholder="Enter email address" required/>
                        {error === warningText.emailTaken ? warningPopup : ""}
                    </div>

                    <div className="mb-3">
                        <Form.Label>Password*</Form.Label>
                        <br></br>
                        <p className="form-text text-muted lh-sm">
                            Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters
                        </p>
                        <Form.Control type="password" id="password" name="password" placeholder="Enter password" 
                        className="form-control" pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
                        required/>
                    </div>

                    <div className="mb-3">
                        <Form.Label>Confirm Password*</Form.Label>
                        <Form.Control type="password" id="confirmPassword" name="confirmPassword" placeholder="Re-enter password" required/>
                        {error === warningText.passwordMatch ? warningPopup : ""}
                    </div>

                    <div className="mb-3 text-center">
                        <Button variant="primary" type="submit" disabled={disableButton}>
                            Sign Up
                        </Button>
                    </div>
        
                </Form>
                <p className="mb-3 text-center">Already have an account? <a href="/signin">Sign in here.</a></p>
            </div>
        </>
    )
}