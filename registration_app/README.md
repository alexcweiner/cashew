1. Registration Service
Purpose: The registration service is responsible for creating new user accounts. It handles user input validation, password hashing, and storing user information in the database.
Process:
Users submit their registration details (username, password, email, etc.) to this service.
The service validates the data, hashes the password, and then stores the user information in your database.
Optionally, this service can handle additional steps like email verification.


graph TD
    RF(RegisterForm.js) -->|POST /registration/register| NG1(nginx.conf)
    NG1 -->|forward /registration/*| RA(registration_app:3000/register)
    RA -->|POST https://nginx/db/newuser| NG2(nginx.conf)
    NG2 -->|forward /db/*| DBA(db_app:3000/newuser)
    DBA -->|SQL Insert User| DB(PostgreSQL DB)
    DB -->|Return Result| DBA
    DBA -->|Return JSON| RA
    RA -->|Respond with JSON| RF


graph TD
    subgraph frontend
        RF(RegisterForm.js) -->|POST /registration/register| NG1(nginx.conf)
    end

    subgraph backend
        subgraph your_service
            RA(registration_app:3000/register)
        end
        NG1 -->|forward /registration/*| RA
        RA -->|POST https://nginx/db/newuser| NG2(nginx.conf)
        NG2 -->|forward /db/*| DBA(db_app:3000/newuser)
        
        subgraph data_layer
            DBA -->|SQL Insert User| DB(PostgreSQL DB)
            DB -->|Return Result| DBA
        end

        DBA -->|Return JSON| RA
        RA -->|Respond with JSON| RF
    end
