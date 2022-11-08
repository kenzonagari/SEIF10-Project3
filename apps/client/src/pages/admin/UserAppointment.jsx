import NavigationBar from "./Navbar"
import { Card } from "react-bootstrap"
import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom'
import HeaderFunction from "./Header";

export default function UserAppointment () {

    const navigate = useNavigate();
    const { apptId } = useParams();
    const [apptInfoData, setApptInfoData] = useState({});
    const [userProfileInfo, setuserProfileInfo] = useState({});

    useEffect(() => {
        fetch(`/api/apptsummary/${apptId}`)
            .then((response) => response.json())
            .then((data) => {
                // console.log(data["userApptHistory"], data["userProfile"][0]);
                setApptInfoData(data["userApptHistory"]);
                setuserProfileInfo(data["userProfile"][0]);
            });
    }, [])

    const handleUpdateAppt = () => {
        navigate(`/admin/userApptUpdate/${apptId}`);
    }

    const handleDeleteAppt = () => {

    }

    const medLine = `${apptInfoData?.medPrescription?.medicine} | ${apptInfoData?.medPrescription?.dosage} | ${apptInfoData?.medPrescription?.instruction}`;

    return (
        <>
        <div className="body">
            <HeaderFunction />
            <div className="d-flex flex-row">
                <NavigationBar userProfileInfo={userProfileInfo} />
                <div className="card m-4 p-5" style={{ width: "65%", height: "fit-content" }}>
                    <h2 className="card-title mb-4">Appointment Overview</h2>
                    <div className="d-flex flex-row justify-content-between mb-3">
                        <Card>
                            <div className="card-body p-4">
                                <h4 className="card-title">Date</h4>
                                <p className="card-text">{apptInfoData?.date?.slice(0,10)}</p>
                            </div>
                        </Card>
                        <Card>
                            <div className="card-body p-4">
                                <h4 className="card-title">Time</h4>
                                <p className="card-text">{apptInfoData?.time} {parseInt(apptInfoData?.time?.slice(0,2)) < 12 ? "AM" : "PM"}</p>
                            </div>
                        </Card>
                        <Card>
                            <div className="card-body p-4">
                                <h4 className="card-title">Appt Type</h4>
                                <p className="card-text">{apptInfoData?.purpose}</p>
                            </div>
                        </Card>
                        <Card>
                            <div className="card-body p-4">
                                <h4 className="card-title">Require Follow-up?</h4>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="defaultCheck2" checked={apptInfoData?.followUp ? true : false} disabled />
                                </div>
                            </div>
                        </Card>
                        <Card>
                            <div className="card-body p-4">
                                <h4 className="card-title">Billing</h4>
                                <p className="card-text">{apptInfoData?.billingInfo?.toFixed(2)}</p>
                            </div>
                        </Card>
                    </div>

                    <div className="mb-3">
                        <h4>Summary | Diagnosis</h4>
                        <div className="form-group">
                            <textarea className="form-control" id="appt-summary" rows="2" value={apptInfoData?.summary} readOnly></textarea>
                        </div>
                    </div>

                    <div className="mb-3">
                        <h4>Medication</h4>
                        <div className="form-group">
                            <textarea className="form-control" id="appt-medication" rows="2" value={apptInfoData?.medPrescription ? medLine : "NA"} readOnly></textarea>
                        </div>
                    </div>

                    <div className="d-flex flex-row justify-content-around my-4">
                        <button type="button" className="btn btn-primary p-3" onClick={handleUpdateAppt}>Update Appointment Record</button>
                        <button type="button" className="btn btn-danger p-3" onClick={handleDeleteAppt}>Delete Appointment Record</button>
                    </div>

                </div>
            </div>
        </div>
        </>
    )
}