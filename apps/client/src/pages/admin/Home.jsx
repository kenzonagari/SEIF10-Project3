import { Table } from 'react-bootstrap'

export default function AdminHome () {
    return (
        <>
        <Table>
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Full Name</th>
                    <th scope="col">NRIC/FIN</th>
                    <th scope="col">Appointment Type</th>
                    <th scope="col">Appt. Date</th>
                    <th scope="col">Appt. Time</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">1</th>
                    <td>Firstname Lastname</td>
                    <td>S12345678E</td>
                    <td>General Checkup</td>
                    <td>05 August 2022</td>
                    <td>10.00 AM</td>
                </tr>
                <tr>
                    <th scope="row">2</th>
                    <td>Firstname Lastname</td>
                    <td>S12345678E</td>
                    <td>Follow-up</td>
                    <td>05 August 2022</td>
                    <td>10.00 AM</td>
                </tr>
            </tbody>
        </Table>
        </>
    )
}