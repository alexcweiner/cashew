import express from 'express';
const app = express();
const port = 3000;

import fetch from 'node-fetch';
import bcrypt from 'bcrypt'


app.use(express.json()); // Middleware to parse JSON bodies

app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    // Basic validation
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    try { //POSTing to the db server
        const postResponse = await fetch('http://nginx/db/newuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: hashedPassword
            }),
        });

        // Check the response status code
        if (postResponse.ok) {
            res.json({ message: 'Data forwarded successfully' });
        } else {
            const errorData = await postResponse.json(); // Optional: capture more error details
            res.status(postResponse.status).json({ message: 'Failed to forward data', error: errorData });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('An error occurred');
    }
});


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
