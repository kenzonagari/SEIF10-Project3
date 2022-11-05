import NavigationBar from "./Navbar"
import { Card } from "react-bootstrap"
import { useNavigate } from 'react-router-dom'

export default function UserAppointment () {

    const navigate = useNavigate();

    const handleLink = () => {
        navigate('/admin/userApptUpdate');
    }

    return (
        <>
            <div className="body">

                <NavigationBar />

                <div className="user-profile">
                    <h1>Appointment Overview</h1>
                    <div className="appt basic-info">
                        <Card>
                            <div className="card-body">
                                <h3 className="card-title">Date</h3>
                                <p className="card-text">20 October 2022</p>
                            </div>
                        </Card>
                        <Card>
                            <div className="card-body">
                                <h3 className="card-title">Time</h3>
                                <p className="card-text">10:00 AM</p>
                            </div>
                        </Card>
                        <Card>
                            <div className="card-body">
                                <h3 className="card-title">Appt Type</h3>
                                <p className="card-text">General checkup</p>
                            </div>
                        </Card>
                        <Card>
                            <div className="card-body">
                                <h3 className="card-title">Require Follow-up?</h3>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="defaultCheck2" checked disabled />
                                </div>
                            </div>
                        </Card>
                        <Card>
                            <div className="card-body">
                                <h3 className="card-title">Billing</h3>
                                <p className="card-text">50.00</p>
                            </div>
                        </Card>
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
                        <button type="button" className="btn btn-primary" onClick={handleLink}>Update Appointment Record</button>
                        <button type="button" className="btn btn-danger">Delete Appointment Record</button>
                    </div>

                </div>

            </div>
        </>
    )
}