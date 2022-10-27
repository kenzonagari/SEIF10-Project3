import NavigationBar from "./Navbar"
import { Card, Form, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

import '../body.css'
import CreateProfile from "../users/CreateProfile";

export default function UserProfileUpdate () {

    const navigate = useNavigate();

    const handleLink = () => {
        navigate('/admin/userAppointment');
    }

    return (
        <div className="body">
            <Card>

                <h1>User Profile Update</h1>

                <Form onSubmit={handleLink}>

                    <Form.Group className="mb-3">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" id="username" defaultValue="prefilled username" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" id="email" defaultValue="prefilled email" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" id="firstName" defaultValue="prefilled first name" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" id="lastName" defaultValue="prefilled last name" />
                    </Form.Group>

                    <Form.Text className="text-muted">
                        Email us at ... to request changes to this information
                    </Form.Text>

                    <Form.Group className="mb-3">
                            <Form.Label>Date Of Birth</Form.Label>
                            <Form.Control type="text" id="dateOfBirth" defaultValue="date of birth" />
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
                            <Form.Control type="text" id="mobileNo" defaultValue="12345678" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                            <Form.Label>Medication Allergies</Form.Label>
                            <Form.Control type="text" id="medAllergy" defaultValue="Medication allergies (if any, otherwise write NA)" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                            <Form.Label>Past Illnesses</Form.Label>
                            <Form.Control type="text" id="pastIllness" defaultValue="Past Illnesses (if any, otherwise write NA)" />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Confirm
                    </Button>

                </Form>
            </Card>
        </div>
    )
}