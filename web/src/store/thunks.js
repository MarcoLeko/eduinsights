export const isLoggedIn = async preloadedState => {
    try {
        const response = await checkLoggedIn();

        if (response) {
            preloadedState = {
                authReducer: response
            };
        }

        return preloadedState;
    } catch (e) {
        return preloadedState;
    }

};

export async function getInternetAccessStatistics() {
    const response = await fetch('http://localhost:8080/statistics/api/internet-access');
    return handleResponse(response);
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

    return handleResponse(response);
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

    return handleResponse(response);
}

export async function logoutUser() {
    const response = await fetch("http://localhost:8080/auth/logout", {method: 'DELETE', credentials: 'include'});
    return handleResponse(response);
}


export async function checkLoggedIn() {
    const response = await fetch('http://localhost:8080/auth/check/logged-in', {credentials: 'include'});
    return handleResponse(response);
}

export async function checkEmailToken(payload) {
    const response = await fetch('http://localhost:8080/auth/validate-token', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return handleResponse(response)
}

export async function sendNewValidationEmail(payload) {
    const response = await fetch('http://localhost:8080/auth/send-validation-email', {
        method: 'GET',
        credentials: 'include',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return handleResponse(response);
}

function handleResponse(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response.json();
}
