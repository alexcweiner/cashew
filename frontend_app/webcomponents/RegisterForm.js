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


/////////////////////////////////////////////


// Assuming this code is within a method of a custom element class
// createRegisterForm() {
//     // Clear existing content
//     this.shadowRoot.innerHTML = '';

//     // Create link to CSS
//     const link = document.createElement('link');
//     link.setAttribute('rel', 'stylesheet');
//     link.setAttribute('href', 'styles.css');
//     this.shadowRoot.appendChild(link);

//     // Create and append the form elements
//     const form = document.createElement('form');
//     form.setAttribute('id', 'registerForm');

//     // Add fields to the form
//     form.appendChild(this.createFormField('username', 'Username', 'text'));
//     form.appendChild(this.createFormField('email', 'Email', 'email'));
//     form.appendChild(this.createFormField('password', 'Password', 'password'));
//     form.appendChild(this.createFormField('confirmPassword', 'Confirm Password', 'password'));

//     // Create and append the submit button
//     const submitButton = document.createElement('button');
//     submitButton.setAttribute('type', 'submit');
//     submitButton.textContent = 'Register';
//     form.appendChild(submitButton);

//     // Append the form to the shadow root
//     this.shadowRoot.appendChild(form);
// }

// createFormField(id, label, type) {
//     const div = document.createElement('div');

//     const labelElement = document.createElement('label');
//     labelElement.setAttribute('for', id);
//     labelElement.textContent = label + ':';
//     div.appendChild(labelElement);

//     const input = document.createElement('input');
//     input.setAttribute('type', type);
//     input.setAttribute('id', id);
//     input.setAttribute('name', id);
//     input.required = true;
//     div.appendChild(input);

//     return div;
// }
