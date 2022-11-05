import NavigationBar from "./Navbar"
import { Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

export default function UserApptUpdate () {

    const navigate = useNavigate();

    const handleLink = () => {
        navigate('/admin/userAppointment');
    }

    return (
        <>
            <div className="body">

                <NavigationBar />

                <div className="user-profile">
                    <h1>Appointment Overview Update</h1>

                    <div className="appt basic-info-update">

                        <Form>

                            <Form.Group className="mb-3">
                                <Form.Label>Date</Form.Label>
                                <Form.Control type="text" id="date" placeholder="appointment date" />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Time</Form.Label>
                                <Form.Control type="text" id="time" placeholder="appointment time" />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Appointment Type</Form.Label>
                                <Form.Control type="text" id="appointmentType" placeholder="appointment type" />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Require follow-up?</Form.Label>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" id="defaultCheck2"/>
                                </div>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Billing</Form.Label>
                                <Form.Control type="number" id="billing" placeholder="(in SGD)" />
                            </Form.Group>

                        </Form>

                    </div>

                    <div className="appt summary">
                        <h3>Summary | Diagnosis</h3>
                        <div className="form-group">
                            <textarea className="form-control" id="appt-summary" rows="10" cols="100"></textarea>
                        </div>
                    </div>

                    <div className="appt medication">
                        <h3>Medication</h3>
                        <div className="form-group">
                            <textarea className="form-control" id="appt-medication" rows="3"></textarea>
                        </div>
                    </div>

                    <div className="appt overview-btns">
                        <button type="button" className="btn btn-primary" onClick={handleLink}>Submit</button>
                      </div>

                </div>

            </div>
        </>
    )
}