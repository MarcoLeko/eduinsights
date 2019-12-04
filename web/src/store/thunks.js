export async function getInternetAccessStatistics() {
    try {
        const response = await fetch('https://localhost:8080/statistics/internet-access');
        return response.json();
    } catch (e) {
        // notify with global toast message: 'Could not fetch Internet-statistics: ' + e.
        return {type: 'featureCollection', features: []};
    }
}

export async function registerNewUser(payload) {
    try {
        return fetch('https://localhost:8080/register', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (e) {
        // notify with global toast message something went wrong
        return e;
    }

}
