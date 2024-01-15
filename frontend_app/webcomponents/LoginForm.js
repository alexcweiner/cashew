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
        this.handleSubmit = this.handleSubmit.bind(this); // Bind the event handler to the class instance
    }

    connectedCallback() {
        this.shadowRoot.querySelector('#loginForm').addEventListener('submit', this.handleSubmit);
    }

    disconnectedCallback() {
        this.shadowRoot.querySelector('#loginForm').removeEventListener('submit', this.handleSubmit);
    }

    handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const username = formData.get('username');
        const password = formData.get('password');

        fetch('/auth/token', {
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
                console.log('Login successful:', data);

                localStorage.setItem('token', data.token); // Store the token in local storage

                window.location.href = '/dashboard';
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
}

customElements.define('login-form', LoginForm);
