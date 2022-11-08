import NavigationBar from "./Navbar"
import { Form } from "react-bootstrap"
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"
import HeaderFunction from "./Header";

export default function UserApptUpdate () {

    const navigate = useNavigate();
    const { apptId } = useParams();
    const [apptInfoData, setApptInfoData] = useState({});
    const [userProfileInfo, setuserProfileInfo] = useState({});
    const [disableButton, setDisableButton] = useState(false);

    useEffect(() => {
        fetch(`/api/apptsummary/${apptId}`)
            .then((response) => response.json())
            .then((data) => {
                // console.log(data["userApptHistory"], data["userProfile"][0]);
                setApptInfoData(data["userApptHistory"]);
                setuserProfileInfo(data["userProfile"][0]);
            });
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        setDisableButton(true);

        let myFormData = new FormData(event.target);
        let apptSummaryObj = Object.fromEntries(myFormData.entries());

        //conditionals
        

        if(apptSummaryObj.followUp){
            apptSummaryObj.followUp = true;
        } else {
            apptSummaryObj.followUp = false;
        }

        if(!apptInfoData.medPrescription){
            fetch('/api/userlogin/signin', {    method: "POST", 
                                                headers: {
                                                    "Content-type": "application/json" //* vvvvv important, otherwise server receives empty object
                                                },
                                                body: JSON.stringify(userLoginObj) 
                                    })
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    if(data.msg === "Email not found"){
                        setError(warningText.emailNotFound);
                    } else 
                    if(data.msg === "Incorrect password"){
                        setError(warningText.incorrectPassword);
                    } else 
                    if(data.msg === "Redirecting to /home"){
                        setError("");
                        return navigate("/home");
                    } else
                    if(data.msg === "Redirecting to /createProfile"){
                        setError("");
                        return navigate("/createProfile");
                    } else 
                    if(data.msg === "Redirecting to /admin/home"){
                        setError("");
                        return navigate("/admin/home");
                    }
                    setDisableButton(false);
                    return;
                })
        } else {
            console.log("med exists")
        }

        console.log(apptSummaryObj);
    }

    const handleCancel = () => {
        navigate(`/admin/userAppointment/${apptId}`);
    }

    return (
        <>
            <div className="body">
                <HeaderFunction />
                <div className="d-flex flex-row">
                    <NavigationBar userProfileInfo={userProfileInfo} />
                    <div className="card m-4 p-5" style={{ width: "65%", height: "fit-content" }}>
                        <h2 className="card-title mb-5">Appointment Overview Update</h2>
                        <div className="mb-4">
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Date</Form.Label>
                                    <Form.Control type="text" id="date" placeholder={apptInfoData?.date?.slice(0,10)} readOnly/>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Time</Form.Label>
                                    <Form.Control type="text" id="time" placeholder={apptInfoData?.time} readOnly/>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Appointment Type</Form.Label>
                                    <Form.Control type="text" id="purpose" name="purpose" defaultValue={apptInfoData?.purpose} required/>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Require follow-up?</Form.Label>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" id="followUp" name="followUp" defaultValue={apptInfoData?.followUp ? "on" : "off"}/>
                                    </div>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Billing <span className="text-secondary">(in SGD)</span></Form.Label>
                                    <Form.Control type="number" id="billingInfo" name="billingInfo" defaultValue={apptInfoData?.billingInfo} required/>
                                </Form.Group>

                                <div className="mb-3">
                                    <Form.Label>Summary | Diagnosis</Form.Label>
                                    <textarea className="form-control" id="summary" name="summary" rows="3" cols="100" defaultValue={apptInfoData?.summary} required></textarea>
                                </div>

                                <div className="card p-4 bg-primary bg-opacity-25 mb-5" style={{ width: "100%", height: "fit-content" }}>
                                    <h3 className="card-title mb-4">Prescription</h3>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Medicine</Form.Label>
                                        <Form.Control type="text" id="medicine" name="medicine" defaultValue={apptInfoData?.medPrescription?.medicine} required/>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Dosage</Form.Label>
                                        <Form.Control type="text" id="dosage" name="dosage" defaultValue={apptInfoData?.medPrescription?.dosage} required/>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Duration</Form.Label>
                                        <Form.Control type="text" id="duration" name="duration" defaultValue={apptInfoData?.medPrescription?.duration} required/>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Instruction</Form.Label>
                                        <Form.Control type="text" id="instruction" name="instruction" defaultValue={apptInfoData?.medPrescription?.instruction} required/>
                                    </Form.Group>
                                </div>

                                <div className="d-flex flex-row justify-content-around my-4">
                                    <button type="submit" className="btn btn-primary p-3">Update Appointment</button>
                                    <button type="button" className="btn btn-warning p-3" onClick={handleCancel}>Cancel Update</button>
                                </div>

                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}