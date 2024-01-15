const express = require('express');
const app = express();
const port = 3000;
const { Pool } = require('pg');
const dbConfig = require('./dbConfig');
const pool = new Pool(dbConfig);


app.use(express.json());


// pool.connect(err => {
//     if (err) {
//         console.error('connection error', err.stack);
//     } else {
//         console.log('connected to postgres db');
//     }
// });

pool.connect((err, client, release) => {
    if (err) {
        console.error('Error acquiring client', err.stack);

        // Detailed logging for connection error
        console.error('Failed to connect to PostgreSQL Database.');
        console.error('Error Details:', err.message);
        console.error('Stack Trace:', err.stack);

        // Logging the database configuration for verification (excluding sensitive data)
        console.log('Database Configuration Used:', {
            user: dbConfig.user,
            host: dbConfig.host,
            database: dbConfig.database,
            port: dbConfig.port,
            // Do not log the password or any other sensitive information
        });

        // Additional information
        console.log('Timestamp:', new Date().toISOString());
        console.log('Ensure that the PostgreSQL server is running and reachable.');
        console.log('Verify that the database configuration (host, port, user, database) is correct.');
    } else {
        console.log('Successfully connected to postgres db.');

        // You can add additional logs here if you want to log more details on successful connection
        // Remember to release the client when you are done
        release();
    }
});

app.post('/newuser', async (req, res) => {
    const { username, email, password } = req.body;

    const sql = `
    INSERT INTO users (username, email, password)
    VALUES ($1, $2, $3)
    RETURNING id, username, email, created_at, updated_at;
  `;

    try {
        const queryResult = await pool.query(sql, [username, email, password]);
        const user = queryResult.rows[0];

        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        // Handle specific errors (e.g., user already exists, database errors)
        console.error(error);
        if (error.code === '23505') {
            res.status(409).json({ error: 'Email already exists' });
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
});


app.get('/getUserPassword/:username', async (req, res) => {
    const { username } = req.params;

    try {
        const queryResult = await pool.query('SELECT password FROM users WHERE username = $1', [username]);

        if (queryResult.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const user = queryResult.rows[0];
        res.json({ hashedPassword: user.password });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
