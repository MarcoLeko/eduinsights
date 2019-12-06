export async function getInternetAccessStatistics() {
    try {
        const response = await fetch('http://localhost:8080/statistics/internet-access');
        return response.json();
    } catch (e) {
        // throw new Error('Could not fetch Internet-statistics' + e);
        return {type: 'featureCollection', features: []};
    }
}

export async function registerUser(payload) {
    return fetch('http://localhost:8080/register', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export async function loginUser(payload) {
    return fetch('http://localhost:8080/login', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export async function logoutUser() {
    return fetch("http://localhost:8080/logout", {method: 'DELETE', credentials: 'include'});
}


export async function checkLoggedIn() {
    return await fetch('http://localhost:8080/check/logged-in',{credentials: 'include'});
}
