const express = require('express');
const app = express();
const port = 3000;
// const passport = require('passport');

// Initialize Passport
// app.use(passport.initialize());
// app.use(passport.session());

// var session = require('express-session');

// var SQLiteStore = require('connect-sqlite3')(session);
// var authRouter = require('./routes/auth');

// app.use(express.static(path.join(__dirname, 'public')));
// app.use(session({
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: false,
//     store: new SQLiteStore({ db: 'sessions.db', dir: './var/db' })
// }));
// app.use(passport.authenticate('session'));

// app.js or any other relevant file

const { Pool } = require('pg');
const dbConfig = require('./dbConfig');

const pool = new Pool(dbConfig);

pool.connect(err => {
    if (err) {
        console.error('connection error', err.stack);
    } else {
        console.log('connected to postgres db');
    }
});


app.get('/api/data', (req, res) => {
    res.json({ message: "Hello from the Node.js API!" });
});

app.get('/api/now', (req, res) => {
    pool.query('SELECT NOW()', (err, queryRes) => {
        if (err) {
            console.error('Error executing query', err.stack);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.json(queryRes.rows[0]);
        }
    });
});

app.use(express.json()); // Middleware to parse JSON bodies

app.post('/api/register', (req, res) => {
    const { username, email, password } = req.body;

    // Basic validation
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    // Additional validation can be performed here
    // For example, checking if the email is valid, password length, etc.

    // Assuming you have a function to handle the registration logic
    // registerUser(username, email, password).then(user => {
    //     res.status(201).json({ message: 'User registered successfully', user });
    // }).catch(error => {
    //     // Handle specific errors (e.g., user already exists, database errors)
    //     console.error(error);
    //     res.status(500).json({ error: 'Internal server error' });
    // });

    // Placeholder response for demonstration
    console.log(`Registering user: Username: ${username}, Email: ${email}`);
    res.status(201).json({ message: 'User registered successfully' });
});


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
