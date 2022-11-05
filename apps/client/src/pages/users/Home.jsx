import Header from "./Header";
import NavigationBar from "./Navbar";
import UserProfile from "./UserProfile";
import HealthProfile from "./HealthProfile";
import BookAppointment from "./BookAppointment";
import { useState, useEffect } from "react";

export default function Home ({page}) {

    const [userProfileInfo, setUserProfileInfo] = useState({});

    useEffect(() => {   
        fetch('/api/userprofile/')
            .then((response) => response.json())
            .then((data) => {
                data[0].dateOfBirth = data[0].dateOfBirth.slice(0,10);
                setUserProfileInfo(data[0]);
            });
    }, []);

    const userProfile = <UserProfile userProfileInfo={userProfileInfo}/>;
    const healthProfile = <HealthProfile userProfileInfo={userProfileInfo}/>;
    const bookAppointment = <BookAppointment />;

    return (
        <>
        <Header userProfileInfo={userProfileInfo}/>
        <div className="body min-vh-100 d-flex flex-row">
            <NavigationBar page={page}/>
            {   page === "userProfile"? userProfile : 
                page === "healthProfile"? healthProfile :
                page === "bookAppointment"? bookAppointment : ""
            }
        </div>
        </>
    )
}