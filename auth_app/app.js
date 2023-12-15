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

app.post('/api/register', async (req, res) => {
    const { username, email, password } = req.body;

    // Basic validation
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `
    INSERT INTO users (username, email, password)
    VALUES ($1, $2, $3)
    RETURNING id, username, email, created_at, updated_at;
  `;

    try {
        const queryResult = await pool.query(sql, [username, email, hashedPassword]);
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


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
