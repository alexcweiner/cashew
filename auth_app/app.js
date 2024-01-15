const express = require('express');
const fetch = require('node-fetch');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/token', async (req, res) => {
    const { username, password } = req.body;
    console.log('Received token request for username:', username);

    try {
        console.log(`Fetching password for ${username}`);
        const response = await fetch(`http://nginx/db/getUserPassword/${username}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        console.log(`Response status from db_app for ${username}:`, response.status);
        if (!response.ok) {
            console.log('User not found or db_app error');
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const userData = await response.json();
        console.log(`Received data for ${username}`, userData);

        const isMatch = await bcrypt.compare(password, userData.hashedPassword);
        console.log(`Password match for ${username}:`, isMatch);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // Assuming you have a secret key for JWT
        const secretKey = "YOUR_SECRET_KEY"; // Replace with your actual secret key
        const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });

        res.json({ token }); // Send the token to the client
        
    } catch (error) {
        console.error('Error in /token endpoint:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/validate', (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.sendStatus(401); // Unauthorized if no token is provided
    }

    jwt.verify(token, 'YOUR_SECRET_KEY', (err) => {
        if (err) {
            return res.sendStatus(403); // Forbidden if token is invalid
        }
        res.sendStatus(200); // OK if token is valid
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
