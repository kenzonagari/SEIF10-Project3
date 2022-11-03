import Header from "../Header";
import NavigationBar from "./Navbar";
import UserProfile from "./UserProfile";
import HealthProfile from "./HealthProfile";
import BookAppointment from "./BookAppointment";
import { useState, useEffect } from "react";

export default function Home ({page}) {

    const userProfile = <UserProfile />;
    const healthProfile = <HealthProfile />;
    const bookAppointment = <BookAppointment />;


    return (
        <>
        <Header />
        <div className="body min-vh-100">
            <NavigationBar page={page}/>
            {   page === "userProfile"? userProfile : 
                page === "healthProfile"? healthProfile :
                page === "bookAppointment"? bookAppointment : ""
            }
        </div>
        </>
    )
}