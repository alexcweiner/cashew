// dbConfig.js

const dbConfig = {
    user: 'your_user',
    host: 'postgres', // Use the service name as defined in docker-compose
    database: 'your_db',
    password: 'your_password',
    port: 5432, // PostgreSQL server port
};

module.exports = dbConfig;
