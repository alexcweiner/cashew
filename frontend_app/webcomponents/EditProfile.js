class EditProfile extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `

            <link rel="stylesheet" href="styles.css">
            <style>
                /* Add your CSS styles here */
                .edit-profile-container {
                    padding: 20px;
                    border: 1px solid #ccc;
                    border-radius: 8px;
                    max-width: 300px;
                    margin: 20px auto;
                }

                .edit-profile-container input,
                .edit-profile-container button {
                    width: 100%;
                    margin: 10px 0;
                }
            </style>
            <div class="edit-profile-container">
                <h2>Edit Profile</h2>
                <form id="editProfileForm">
                    <div>
                        <label for="username">Username:</label>
                        <input type="text" id="username" name="username" value="JohnDoe">
                    </div>
                    <div>
                        <label for="email">Email:</label>
                        <input type="email" id="email" name="email" value="johndoe@example.com">
                    </div>
                    <!-- Add more fields as needed -->
                    <button type="submit">Update Profile</button>
                </form>
            </div>
        `;
        this.shadowRoot.querySelector('#editProfileForm').addEventListener('submit', this._handleSubmit.bind(this));
    }

    _handleSubmit(event) {
        event.preventDefault();
        // Here you can add logic to handle form submission, like sending data to a server
        console.log('Form submitted');
    }
}

customElements.define('edit-profile', EditProfile);
