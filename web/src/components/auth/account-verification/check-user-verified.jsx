import React, {useEffect} from "react";
import {checkEmailToken} from "../../../store/thunks";
import {connect} from "react-redux";

function CheckUserVerified({firstName, email, token}) {
    useEffect(() => {
        checkEmailToken({token})
    }, [token]);
    return (
        <>
            <h1>Hello {firstName}</h1>
            <div>{email} is verified with token: {token}</div>
        </>
    )
}

const mapStateToProps = store => ({
    firstName: store.authReducer.firstName,
    email: store.authReducer.email,
});

export default connect(mapStateToProps)(CheckUserVerified)