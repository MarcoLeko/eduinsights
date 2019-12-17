import React from "react";
import {useLocation} from "react-router-dom";
import CheckUserVerified from "./check-user-verified";

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function VerifyEmail() {
    const query = useQuery();
    const token = query.get('token');

    return (
        <div className="App email-verification-container">
            <CheckUserVerified token={token}/>
        </div>
    );
}