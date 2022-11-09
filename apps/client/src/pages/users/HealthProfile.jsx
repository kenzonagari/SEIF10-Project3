import { Table } from 'react-bootstrap'
import { useState } from "react"
import { useEffect } from 'react'


export default function HealthProfile ({userProfileInfo}) {

    const [apptInfo, setApptInfo] = useState([]); 

    useEffect(() => {
        fetch('/api/apptsummary/')
        .then((response) => response.json())
        .then((data) => {
            // console.log(data);
            setApptInfo(data);
        });
    }, []);

    let medPrescriptionElement = [];
    let upcomingApptElement = [];
    let pastApptElement = [];
    let billingElement = [];

    let medCounter = 1;
    let upcomingApptCounter = 1;
    let pastApptCounter = 1;

    for(let element of apptInfo){
        if(!element.apptCompleted){
            upcomingApptElement.push(
                <tr key={upcomingApptCounter}>
                    <th scope="row">{upcomingApptCounter}</th>
                    <td>{element.date.slice(0,10)}</td>
                    <td>{element.time}</td>
                    <td>{element.purpose}</td>
                </tr>
            );
            upcomingApptCounter++;
        } else {
            pastApptElement.push(
                <tr key={pastApptCounter}>
                    <th scope="row">{pastApptCounter}</th>
                    <td>{element.date.slice(0,10)}</td>
                    <td>{element.time}</td>
                    <td>{element.purpose}</td>
                    <td>{element.summary}</td>
                    <td>{element.medPrescription ? `${element.medPrescription.medicine} ${element.medPrescription.dosage}` : "NA"}</td>
                    <td>{element.followUp? "Yes" : "No"}</td>
                </tr>
            );

            billingElement.push(
                <tr key={pastApptCounter}>
                    <th scope="row">{pastApptCounter}</th>
                    <td>{element.date.slice(0,10)}</td>
                    <td>{element.billingInfo.toFixed(2)}</td>
                </tr>
            );

            pastApptCounter++;

            if(element.medPrescription){
                medPrescriptionElement.push(
                    <tr key={medCounter}>
                        <th scope="row">{medCounter}</th>
                        <td>{element.medPrescription.medicine}</td>
                        <td>{element.medPrescription.dosage}</td>
                        <td>{element.medPrescription.startDate.slice(0,10)}</td>
                        <td>{element.medPrescription.duration}</td>
                        <td>{element.medPrescription.instruction}</td>
                    </tr>
                );
                medCounter++;
            }
        }
    }

    return (
        <div className="card m-4 p-3" style={{ "width": "100rem", "height": "fit-content" }}>

            <div className="card-body">
                <h2 className="card-title mb-4">Health Profile</h2>
                <div className="card m-1 p-3" style={{ "width": "100%", "height": "fit-content" }}>
                    <h3 className="m-3">Medications</h3>
                    <Table className="table table-borderless table-striped">
                        <thead>
                            <tr>
                                <th scope="col">No.</th>
                                <th scope="col">Medication</th>
                                <th scope="col">Dosage</th>
                                <th scope="col">Start Date</th>
                                <th scope="col">Duration</th>
                                <th scope="col">Instruction</th>
                            </tr>
                        </thead>
                        <tbody>
                            {medPrescriptionElement}
                        </tbody>
                    </Table>
                </div>
                <div className="card m-1 p-3" style={{ "width": "100%", "height": "fit-content" }}>
                    <h3 className="m-3">Upcoming Appointments</h3>
                    <Table className="table table-borderless table-striped">
                        <thead>
                            <tr>
                                <th scope="col">No.</th>
                                <th scope="col">Appointment Date</th>
                                <th scope="col">Appointment Time</th>
                                <th scope="col">Purpose</th>
                            </tr>
                        </thead>
                        <tbody>
                            {upcomingApptElement}
                        </tbody>
                    </Table>
                </div>
                <div className="card m-1 p-3" style={{ "width": "100%", "height": "fit-content" }}>
                    <h3 className="m-3">Past Appointments</h3>
                    <Table className="table table-borderless table-striped">
                        <thead>
                            <tr>
                                <th scope="col">No.</th>
                                <th scope="col">Appointment Date</th>
                                <th scope="col">Appointment Time</th>
                                <th scope="col">Purpose</th>
                                <th scope="col">Summary</th>
                                <th scope="col">Prescription</th>
                                <th scope="col">Require Follow-up?</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pastApptElement}
                        </tbody>
                    </Table>
                </div>
                <div className="card m-1 p-3" style={{ "width": "100%", "height": "fit-content" }}>
                    <h3 className="m-3">Billing History</h3>
                    <Table className="table table-borderless table-striped">
                        <thead>
                            <tr>
                                <th scope="col">No.</th>
                                <th scope="col">Appointment Date</th>
                                <th scope="col">Billing (in SGD)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {billingElement}
                        </tbody>
                    </Table>
                </div>
            </div>

        </div>
    )
}