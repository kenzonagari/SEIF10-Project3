import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const warningText = {
    emailNotFound: "Email address or username not found. Please check and try again.",
    incorrectPassword: "Incorrect password. Please try again.",
}

export default function Signin () {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [disableButton, setDisableButton] = useState(false);

    const handleClick = () => {
        navigate("/signup");
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setDisableButton(true);

        let myFormData = new FormData(event.target);
        let userLoginObj = Object.fromEntries(myFormData.entries());
        let loginIsValid = false;

        // console.log(userLoginObj);
        loginIsValid = true;

        //* only fire off request when input is valid:
        if(loginIsValid){
            fetch('/api/userlogin/signin', {    method: "POST", 
                                                headers: {
                                                    "Content-type": "application/json" //* vvvvv important, otherwise server receives empty object
                                                },
                                                body: JSON.stringify(userLoginObj) 
                                    })
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    if(data.msg === "Email not found"){
                        setError(warningText.emailNotFound);
                    } else 
                    if(data.msg === "Incorrect password"){
                        setError(warningText.incorrectPassword);
                    } else 
                    if(data.msg === "Sign in successful"){
                        setError("");
                        return;
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
            {   error === warningText.emailNotFound ? error :
                error === warningText.incorrectPassword ? error : ""
            }
        </div>;

    return(
        <div className="card m-4 p-4 mx-auto" style={{ width: "30rem" }}>

            <div className="mb-3 text-center">
                <h1>Sign In</h1>
            </div>

            <Form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <Form.Label>Email Address or Username*</Form.Label>
                    <Form.Control type="text" id="email" name="email" placeholder="Enter email address or username" required/>
                </div>

                <div className="mb-3">
                    <Form.Label>Password*</Form.Label>
                    <Form.Control type="password" id="password" name="password" placeholder="Enter password" required/>
                </div>

                <div className="mb-3">
                    {error === warningText.emailNotFound ? warningPopup : ""}
                    {error === warningText.incorrectPassword ? warningPopup : ""}
                </div>

                <div className="mb-3 text-center">
                    <Button variant="primary" type="submit" disabled={disableButton}>
                        Sign In
                    </Button>
                </div>
            </Form>
            <p className="mb-3 text-center">Don't have an account? <a href="/signup" onClick={handleClick}>Sign up here.</a></p>
        </div>
    )
}