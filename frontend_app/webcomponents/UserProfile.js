class UserProfile extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `

            <link rel="stylesheet" href="styles.css">
            <style>
                /* Add your CSS styles here */
                .profile-container {
                    padding: 20px;
                    border: 1px solid #ccc;
                    border-radius: 8px;
                    max-width: 300px;
                    margin: 20px auto;
                }
            </style>
            <div class="profile-container">
                <h2>User Profile</h2>
                <p><strong>Username:</strong> <span id="username">JohnDoe</span></p>
                <p><strong>Email:</strong> <span id="email">johndoe@example.com</span></p>
                <!-- Add more fields as needed -->
            </div>
        `;
    }

    // You can add methods to populate the data dynamically
}

customElements.define('user-profile', UserProfile);
