export async function getInternetAccessStatistics() {
        const response = await fetch('https://localhost:8080/statistics/internet-access');
        return response.json();
}

export async function registerUser(payload) {
        return fetch('https://localhost:8080/register', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json'
            }
        });
}

export async function loginUser(payload) {
        return fetch('https://localhost:8080/login', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json'
            }
        });
}

export async function logoutUser() {
    return fetch("/logout", {method: 'DELETE'});
}


export async function checkLoggedIn() {
    const response = await fetch('/check/logged-in');
    const { istAuthenticated } = await response.json();
    return istAuthenticated;
}
