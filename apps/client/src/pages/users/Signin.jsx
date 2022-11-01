import { Card, Form, Button } from 'react-bootstrap'

export default function Signin () {

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(event);
    }

    return(
        <div className="card m-4 p-4" style={{ width: "30rem" }}>
            <h1>Sign In</h1>

            <Form onSubmit={handleSubmit}>

                <Form.Group className="mb-3">
                    <Form.Label>Email Address / Username</Form.Label>
                    <Form.Control type="text" id="username" placeholder="Enter email address or username" />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" id="password" placeholder="Enter password" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Sign In
                </Button>

            </Form>
        </div>
    )
}