curl -X POST http://localhost/registration/register \
-H "Content-Type: application/json" \
-d '{"username": "user1", "email": "user1@example.com", "password": "pass1", "roles": ["role1", "role2"]}'


curl -X POST http://localhost/auth/token \
     -H "Content-Type: application/json" \
     -d '{"username": "user1", "password": "pass1"}' | jq -r '.token' | awk '{print "localStorage.setItem(\"token\", \""$1"\");"}'

