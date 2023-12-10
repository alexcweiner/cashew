class SuccessMessage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
        <style>
            /* Add styles for your success message */
        </style>
        <div>
            <p>Registration Successful!</p>
            <button id="continueButton">Continue</button>
        </div>
        `;
    }

    // You can add more methods or lifecycle hooks if needed
}

customElements.define('success-message', SuccessMessage);