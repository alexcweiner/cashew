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




app.use('/', authRouter);

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
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
