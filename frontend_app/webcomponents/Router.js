
class RouterComponent extends HTMLElement {
    constructor(navLinks = []) {
        super();
        this.navLinks = navLinks

        // Create a shadow DOM for encapsulation
        this.attachShadow({ mode: 'open' });

        // Initialize the content container
        this.shadowRoot.innerHTML = `
        <style>
        /* Basic style for all links */
a {
    color: #007bff; /* Primary link color */
    text-decoration: none; /* Removes underline from links */
    background-image: linear-gradient(transparent 0%, transparent 90%, #007bff 90%); /* Background for underline effect */
    background-size: 0% 100%;
    background-repeat: no-repeat;
    transition: background-size 0.3s ease, color 0.3s ease; /* Smooth transitions for background and color */
    padding-bottom: 2px; /* Padding to avoid clipping */
}

/* Hover effect */
a:hover {
    color: #0056b3; /* Darker shade for hover */
    background-size: 100% 100%; /* Expands the underline effect */
    text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.2); /* Subtle text shadow for depth */
}

/* Active link state */
a:active {
    color: #003875; /* Even darker for active state */
    text-shadow: none; /* Removes text shadow */
}

/* Visited link */
a:visited {
    color: #6c757d; /* Different color for visited links */
    background-image: linear-gradient(transparent 0%, transparent 90%, #6c757d 90%); /* Matching underline color for visited links */
}

/* Link focus for accessibility */
a:focus {
    outline: 2px solid #0056b3; /* Outline for keyboard navigation */
    outline-offset: 2px; /* Distance of outline from the link */
}

        </style>
                <header>
                    <nav id="navContainer">
                    </nav>
                </header>
                <main>
                    <div id="content"></div>
                </main>
                <footer></footer>
            `;
    }

    connectedCallback() {
        const navContainer = this.shadowRoot.querySelector('#navContainer');
        const contentContainer = this.shadowRoot.querySelector('#content');

        this.navLinks.forEach(linkInfo => {
            const link = document.createElement('a');
            link.href = linkInfo.href;
            link.textContent = linkInfo.text;
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.updateContent(contentContainer, linkInfo.component);
            });
            navContainer.appendChild(link);
        });
    }

    updateContent(container, component) {
        if (typeof component === 'string') {
            container.innerHTML = component;
        } else if (component instanceof HTMLElement) {
            container.innerHTML = '';
            container.appendChild(component);
        }
    }
}

customElements.define('router-component', RouterComponent);