import { Card, Form, Button } from 'react-bootstrap'

export default function Signup () {

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(event);
    }

    return(
        <Card>
            <h1>Sign Up</h1>

            <Form onSubmit={handleSubmit}>

                <Form.Group className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" id="firstName" placeholder="Enter first name" />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" id="lastName" placeholder="Enter last name" />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" id="username" placeholder="Enter username" />
                    {/* <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text> */}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" id="email" placeholder="Enter email address" />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" id="password" placeholder="Enter password" />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Re-enter password" />
                </Form.Group>

                <Button variant="primary" type="submit" >
                    Sign Up
                </Button>

            </Form>
        </Card>
    )
}