curl -X POST http://localhost/api/register \
-H "Content-Type: application/json" \
-d '{"username": "user1", "email": "user1@example.com", "password": "pass1", "roles": ["role1", "role2"]}'

curl -X POST http://yourserver.com/api/register \
-H "Content-Type: application/json" \
-d '{"username": "user2", "email": "user2@example.com", "password": "pass2", "roles": ["role1"]}'
