class TimeDisplay extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `<div><p>Current Time: <span id="time">Loading...</span></p></div>`;
    }

    connectedCallback() {
        this.fetchTime();
    }

    async fetchTime() {
        try {
            const response = await fetch('/api/now');
            const data = await response.json();
            this.shadowRoot.getElementById('time').innerText = data.now;
        } catch (error) {
            console.error('Error fetching time:', error);
            this.shadowRoot.getElementById('time').innerText = 'Error fetching time';
        }
    }
}

customElements.define('time-display', TimeDisplay);