export const isLoggedIn = async preloadedState => {
    try {
        const response = await checkLoggedIn();
        const data = await response.json();

        if (data) {
            preloadedState = {
                authReducer: data
            };
        }

        return preloadedState;
    } catch (e) {
        return preloadedState;
    }

};

export async function getInternetAccessStatistics() {
    const response = await fetch('http://localhost:8080/statistics/api/internet-access');
    return handleErrors(response);
}

export async function registerUser(payload) {
    const response = await fetch('http://localhost:8080/auth/register', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return handleErrors(response);
}

export async function loginUser(payload) {
    const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return handleErrors(response);
}

export async function logoutUser() {
    const response = await fetch("http://localhost:8080/auth/logout", {method: 'DELETE', credentials: 'include'});
    return handleErrors(response);
}


export async function checkLoggedIn() {
    const response = await fetch('http://localhost:8080/auth/check/logged-in', {credentials: 'include'});
    return handleErrors(response);
}

export async function checkEmailToken(payload) {
    return fetch('http://localhost:8080/auth/validate-token', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}
