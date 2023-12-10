class LoginForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="styles.css">
            <h2>Login</h2>
            <form id="loginForm">
                <div>
                <label for="username">Username:</label>
                <input type="text" id="username" name="username" required>
                </div>
                <div>
                <label for="password">Password:</label>
                <input type="password" id="password" name="password" required>
                </div>
                <button type="submit">Login</button>
            </form>`;
    }

    connectedCallback() {
        this.shadowRoot.querySelector('#loginForm').addEventListener('submit', e => {
            e.preventDefault();

            const formData = new FormData(e.target);
            const username = formData.get('username');
            const password = formData.get('password');

            fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Login failed');
                    }
                    return response.json();
                })
                .then(data => {
                    // Handle successful login here (e.g., redirect to dashboard)
                    console.log('Login successful:', data);

                    // Redirect to the dashboard page using plain JavaScript
                    window.location.href = '/dashboard';
                })
                .catch(error => {
                    console.error('Error:', error);
                    // Handle error (e.g., show error message)
                });
        });


    }
}

customElements.define('login-form', LoginForm);
