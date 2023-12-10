class RegisterForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="styles.css">
            <h2>Register</h2>
            <form id="registerForm">
                <div>
                <label for="username">Username:</label>
                <input type="text" id="username" name="username" required>
                </div>
                <div>
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required>
                </div>
                <div>
                <label for="password">Password:</label>
                <input type="password" id="password" name="password" required>
                </div>
                <div>
                <label for="confirmPassword">Confirm Password:</label>
                <input type="password" id="confirmPassword" name="confirmPassword" required>
                </div>
                <button type="submit">Register</button>
            </form>`;
    }

    connectedCallback() {
        this.shadowRoot.querySelector('#registerForm').addEventListener('submit', e => {
            e.preventDefault();

            const formData = new FormData(e.target);
            const username = formData.get('username');
            const email = formData.get('email');
            const password = formData.get('password');
            const confirmPassword = formData.get('confirmPassword');

            // Additional validation can be performed here
            if (password !== confirmPassword) {
                console.error('Passwords do not match');
                return;
            }

            fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Registration failed');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Registration successful:', data);
                    const mainElement = document.querySelector('main');
                    mainElement.innerHTML = '';
                    mainElement.appendChild(new SuccessMessage());
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        });
    }
}

customElements.define('register-form', RegisterForm);
