import '@fullcalendar/react/dist/vdom';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import { Form, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ToastElement from '../Toast';

const warningText = {
    invalidDateTime: "Date and time provided are invalid!"
}

export default function BookAppointment () {

    const [dateTime, setDateTime] = useState({});
    const [unavailableDate, setUnavailableDate] = useState([]);
    const [error, setError] = useState("");
    const [disableButton, setDisableButton] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('/api/apptsummary/checkdate')
        .then((response) => response.json())
        .then((data) => {
            if(data.msg === "Not Authorized!"){
                navigate("/");
            }
            setUnavailableDate(data);
        });
    }, [])

    //extracting current date
    const currentDate = () => {
        let currentDate = new Date().toLocaleDateString("en-SG");
        let yyyy = currentDate.slice(6,10);
        let mm = currentDate.slice(3,5);
        let dd = currentDate.slice(0,2);
        currentDate = `${yyyy}-${mm}-${dd}`; // "2022-11-05"
        return currentDate;
    }

    const handleDateClick = (info) => {

        const date = info.dateStr.slice(0,10); //YYYY-MM-DD
        const time = info.dateStr.slice(11,16); //10:00

        for(const element of unavailableDate){
            if((element.date.slice(0,10) === date) && (element.time === time)){
                return;
            }
        }

        setDateTime({
            date: date,
            time: time
        });
    }

    const handleSelectOverlap = (event) => {
        return !event.title==="unavailable";
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setDisableButton(true);

        let myFormData = new FormData(event.target);
        let bookingObj = Object.fromEntries(myFormData.entries());

        //conditionals
        if(bookingObj.date === "" || bookingObj.time === ""){
            setError("Date and time provided are invalid!");
            setDisableButton(false);
            return;
        } else {
            setError("");
        }

        if (bookingObj.purpose === ""){
            bookingObj.purpose = "General check-up";
        } 

        //POST
        fetch('/api/apptsummary', {     method: "POST", 
                                        headers: {
                                            "Content-type": "application/json" //* vvvvv important, otherwise server receives empty object
                                        },
                                        body: JSON.stringify(bookingObj) 
                                })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                // console.log(data)
                if(data.msg === "Booking successful"){
                    return navigate("/healthProfile", {state:{msg: "Booking successful!"}});
                } else 
                if(data.msg === "Server error"){
                    return navigate("/healthProfile", {state:{msg: "Booking failed. Please try again later."}});
                }
            });

    }

    const warningPopup = 
        <div id="passwordHelpBlock" className="form-text text-danger">
            {error === warningText.invalidDateTime ? error : ""}
        </div>;

    const unavailableEvents = unavailableDate.map((element) => {
        let hour = parseInt(element.time.slice(0,2));
        let mins = parseInt(element.time.slice(3,5));

        if(mins + 30 === 30){
            if(hour < 10){
                hour = '0' + hour.toString();
            } else {
                hour = hour.toString();
            }
            mins = "30";
        } else {
            if((hour + 1) < 10){
                hour = '0' + (hour+1).toString();
            } else {
                hour = (hour+1).toString();
            }
            mins = "00";
        }

        element.endTime = hour + ":" + mins; //09:30 or 10:00

        return(
            {
                title: 'unavailable',
                start: `${element.date.slice(0,10)}T${element.time}`,
                end: `${element.date.slice(0,10)}T${element.endTime}`,
                borderColor: "grey",
                display: 'background',
                backgroundColor: "grey",
                textColor: "black",
            }
        )
    });

    return(
        <div className="card m-4 p-5" style={{ width: "60rem", height: "fit-content" }}>
            <div className="user-profile">
                <h2 className="card-title mb-4">Book An Appointment</h2>
                <Form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <div className="form-group mb-3">
                            <label className='form-label'>Purpose*</label>
                            <select className="form-select mb-3" id="purpose" name="purpose" required>
                                <option value=""></option>
                                <option value="General check-up">General check-up</option>
                                <option value="Follow-up">Follow-up</option>
                                <option value="Vaccination">Vaccination</option>
                                <option value="Health screening">Health screening</option>
                            </select>
                        </div>
                    </div>
                    <div className="mb-3">
                        <div className='row'>
                            <div className='col'>
                                <div className="mb-3 md-10">
                                    <Form.Label>Date* <span className='text-muted'>(YYYY/MM/DD)</span></Form.Label>
                                    <Form.Control className="text-dark" type="text" id="date" name="date" defaultValue={dateTime.date ? dateTime.date : ""} readOnly required/>
                                </div>
                            </div>
                            <div className='col'>
                                <div className="mb-3 md-10">
                                    <Form.Label>Time*</Form.Label>
                                    <Form.Control className="text-dark" type="text" id="time" name="time" defaultValue={dateTime.time ? dateTime.time : ""} readOnly required/>
                                </div>
                            </div>
                            {error === warningText.invalidDateTime ? warningPopup : ""}
                        </div>
                        <div className="card p-3 my-3 d-flex flex-row" style={{ width: "100%" }}>
                            <div className='flex-fill p-0'>
                                <FullCalendar
                                    plugins={[ interactionPlugin, timeGridPlugin ]}
                                    initialView="timeGridWeek"
                                    aspectRatio={2}
                                    allDaySlot={false}
                                    weekends={false}
                                    slotMinTime={"09:00:00"}
                                    slotMaxTime={"22:00:00"}
                                    validRange={{start: currentDate()}}
                                    events={unavailableEvents}
                                    selectable={true}
                                    selectOverlap={handleSelectOverlap}
                                    dateClick={handleDateClick}
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                        <Form.Text className="text-muted m-2">
                            Each booking is limited to 30 minutes. Appointment bookings are not available on weekends.
                        </Form.Text>
                    </div>
                    </div>
                    <div className="mb-3 mt-5 text-center">
                        <Button variant="primary" type="submit" className="p-3" disabled={disableButton}>
                            Book appointment
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    )
}