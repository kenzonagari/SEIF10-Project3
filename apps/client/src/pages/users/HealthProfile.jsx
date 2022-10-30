import NavigationBar from "./Navbar"
import { Table } from 'react-bootstrap'
import { useState } from "react"
import '../body.css'

export default function HealthProfile () {
    return (
        <>
        <div className="body">

            <NavigationBar />

            <div className="user-profile">
                <h1>Health Profile</h1>
                <h2>Medications</h2>
                    <Table>
                        <thead>
                            <tr>
                                <th scope="col">#</th>
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
                <h2>Appointments</h2>
                <Table>
                        <thead>
                            <tr>
                                <th scope="col">#</th>
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
                        </tbody>
                    </Table>
                <h2>Billing</h2>
                <Table>
                        <thead>
                            <tr>
                                <th scope="col">#</th>
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
        </>
    )
}