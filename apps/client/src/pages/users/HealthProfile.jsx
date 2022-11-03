import NavigationBar from "./Navbar"
import { Table } from 'react-bootstrap'
import { useState } from "react"


export default function HealthProfile ({userProfileInfo}) {
    return (
        <div className="card m-4 p-3" style={{ "width": "100rem", "height": "fit-content" }}>

            <div className="card-body">
                <h2 className="card-title mb-4">Health Profile</h2>
                <div className="card m-1 p-3" style={{ "width": "100%", "height": "fit-content" }}>
                    <h3 className="m-3">Medications</h3>
                    <Table className="table table-borderless table-striped">
                        <thead>
                            <tr>
                                <th scope="col"></th>
                                <th scope="col">Medication</th>
                                <th scope="col">Dosage</th>
                                <th scope="col">Interval</th>
                                <th scope="col">Start Date</th>
                                <th scope="col">Duration</th>
                                <th scope="col">Notes</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Panadol</td>
                                <td>1 tablet</td>
                                <td>3 times a day</td>
                                <td>05 August 2022</td>
                                <td>10 August 2022</td>
                                <td>Take after every meal</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
                <div className="card m-1 p-3" style={{ "width": "100%", "height": "fit-content" }}>
                    <h3 className="m-3">Appointments</h3>
                    <Table className="table table-borderless table-striped">
                        <thead>
                            <tr>
                                <th scope="col"></th>
                                <th scope="col">Appointment Date</th>
                                <th scope="col">Appointment Time</th>
                                <th scope="col">Purpose</th>
                                <th scope="col">Summary</th>
                                <th scope="col">Prescription</th>
                                <th scope="col">Require Follow-up?</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>05 August 2022</td>
                                <td>2 PM</td>
                                <td>General checkup</td>
                                <td>A mild case of flu</td>
                                <td>(reference medicine schema)</td>
                                <td>No</td>
                            </tr>
                            <tr>
                                <th scope="row">1</th>
                                <td>05 August 2022</td>
                                <td>2 PM</td>
                                <td>General checkup</td>
                                <td>A mild case of flu</td>
                                <td>(reference medicine schema)</td>
                                <td>No</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
                <div className="card m-1 p-3" style={{ "width": "100%", "height": "fit-content" }}>
                    <h3 className="m-3">Billing</h3>
                    <Table className="table table-borderless table-striped">
                        <thead>
                            <tr>
                                <th scope="col"></th>
                                <th scope="col">Appointment Date</th>
                                <th scope="col">Billing (in SGD)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>05 August 2022</td>
                                <td>50.00</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </div>

        </div>
    )
}