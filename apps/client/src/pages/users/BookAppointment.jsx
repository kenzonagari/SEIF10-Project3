import '@fullcalendar/react/dist/vdom';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick


export default function BookAppointment () {

    const handleDateClick = (info) => { // bind with an arrow function
        console.log(info.dateStr);
    };

    return(
        <div className="card m-4 p-5" style={{ width: "70rem", height: "fit-content" }}>

            <div className="user-profile">
                <h2 className="card-title mb-4">Book An Appointment</h2>
                <div className="card p-5 d-flex flex-row" style={{ width: "100%" }}>
                    <div className='flex-fill'>
                        <h3 className="card-title mb-4">Date</h3>
                        <FullCalendar
                            plugins={[ interactionPlugin, dayGridPlugin ]}
                            initialView="dayGridMonth"
                            aspectRatio={1.8}
                            // weekends={false}
                            events={[
                                { title: 'event 1', date: '2022-11-04' },
                                { title: 'event 2', date: '2022-11-10' }
                            ]}
                            dateClick={handleDateClick}
                            selectable={true}
                        />
                    </div>
                    <div>
                        <h3 className="card-title mb-4">Time</h3>
                    </div>
                </div>
            </div>

        </div>
    )
}