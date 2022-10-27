import { Card, Form, Button } from 'react-bootstrap'


export default function CreateProfile () {

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(event);
    }

    return(
        <Card>
            <h1>Complete Your Profile</h1>

            <Form onSubmit={handleSubmit}>

                <fieldset disabled>

                    <Form.Group className="mb-3">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" id="username" placeholder="prefilled username" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" id="email" placeholder="prefilled email" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" id="firstName" placeholder="prefilled first name" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" id="lastName" placeholder="prefilled last name" />
                    </Form.Group>

                    <Form.Text className="text-muted">
                        Email us at ... to request changes to this information
                    </Form.Text>

                </fieldset>

                <Form.Group className="mb-3">
                        <Form.Label>Date Of Birth</Form.Label>
                        <Form.Control type="text" id="dateOfBirth" placeholder="date of birth" />
                </Form.Group>

                <Form.Group className="mb-3">
                        <Form.Label>Sex</Form.Label>
                        <select className="custom-select custom-select-lg mb-3">
                            <option value="male">M</option>
                            <option value="female">F</option>
                            <option value="nonbinary">Non-Binary</option>
                        </select>
                </Form.Group>

                <Form.Group className="mb-3">
                        <Form.Label>Mobile No.</Form.Label>
                        <Form.Control type="text" id="mobileNo" placeholder="12345678" />
                </Form.Group>

                <Form.Group className="mb-3">
                        <Form.Label>Medication Allergies</Form.Label>
                        <Form.Control type="text" id="medAllergy" placeholder="Medication allergies (if any, otherwise write NA)" />
                </Form.Group>

                <Form.Group className="mb-3">
                        <Form.Label>Past Illnesses</Form.Label>
                        <Form.Control type="text" id="pastIllness" placeholder="Past Illnesses (if any, otherwise write NA)" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Confirm
                </Button>

            </Form>
        </Card>
    )
}