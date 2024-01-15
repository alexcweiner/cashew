// When making authenticated requests to your server
function getAuthHeader() {
    const token = localStorage.getItem('token');
    return { 'Authorization': `Bearer ${token}` };
}

// Example of using the token in a request
async function fetchProtectedData() {
    const response = await fetch('http://localhost:3000/protected-route', {
        headers: getAuthHeader(),
    });

    // ...handle the response
}