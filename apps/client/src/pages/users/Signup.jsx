import { Card, Form, Button } from 'react-bootstrap'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signup () {
    const navigate = useNavigate();
    const [status, setStatus] = useState(0);

    const handleSubmit = (event) => {
        event.preventDefault();
        const myFormData = new FormData(event.target);
        const userLoginObj = Object.fromEntries(myFormData.entries());
        console.log(userLoginObj);

        let loginIsValid = false;

        //conditionals

        if(userLoginObj.username.length < 3){
            console.log("username needs to have more than 3 letters!");
        } else {
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
                    response.json();
                    if(response.status === 401){
                        setStatus(401);
                    } else 
                    if(response.status === 200){
                        // console.log('yay');
                        // navigate(`/holidays`);
                    } else 
                    if(response.status === 500){
                        setStatus(500);
                        // console.log(response);
                        // navigate(`/holidays`);
                    }
                })
                .then((data) => console.log(data));
        } else {
            setStatus("no input");
        }
    }

    return(
        <div className="card m-4 p-4" style={{ width: "30rem" }}>
            <h1>Sign Up</h1>
            <Form onSubmit={handleSubmit}>
               
                    <div className="mb-3">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" id="firstname" name="firstname" placeholder="Enter first name" required/>
                    </div>

                    <div className="mb-3">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" id="lastname" name="lastname" placeholder="Enter last name" required/>
                    </div>

                    <div className="mb-3">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" id="username" name="username" placeholder="Enter username" required/>
                    </div>

                    <div className="mb-3">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email" id="email" name="email" placeholder="Enter email address" required/>
                    </div>

                    <div className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" id="password" name="password" placeholder="Enter password" required/>
                    </div>

                    <div className="mb-3">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Re-enter password" required/>
                    </div>

                    <div className="mb-3">
                        <Button variant="primary" type="submit" >
                            Sign Up
                        </Button>
                    </div>
       
            </Form>
        </div>
    )
}