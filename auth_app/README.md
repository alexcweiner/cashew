2. Authentication Service (Using Passport.js)
Purpose: The authentication service is responsible for verifying user credentials and issuing tokens or session identifiers. Passport.js fits perfectly into this role.
Process:
When a user tries to log in, this service uses Passport.js to authenticate the user's credentials against the database.
Upon successful authentication, Passport.js can either create a session or generate a token (like JWT) depending on your application's needs.
Passport.js strategies (like Local Strategy for username and password, JWT Strategy for token-based authentication, etc.) are used here.
