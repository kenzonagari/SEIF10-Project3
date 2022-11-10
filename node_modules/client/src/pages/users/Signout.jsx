import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Signout () {

    const navigate = useNavigate();

    useEffect(() => {
        fetch('/api/userlogin/signout')
            .then((response) => response.json())
            .then((data) => {
                if(data.msg === "Sign out successful"){
                    navigate("/signin");
                }
            });
    }, [])

    return(
        <>
            <div>
                <p>Signing out. Redirecting...</p>
            </div>
        </>
    )
}