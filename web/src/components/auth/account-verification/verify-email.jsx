import React, {lazy, Suspense} from "react";
import {useLocation} from "react-router-dom";

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Lazy = lazy(() => import('./check-user-verified'));

export default function VerifyEmail() {
    const query = useQuery();
    const token = query.get('token');

    return (
        <div className="App email-verification-container">
            <Suspense fallback={<div>Loading...</div>}>
                <Lazy token={token}/>
            </Suspense>
        </div>
    );
}