# signin-signup

1. Create User

curl --location --request POST 'localhost:3000/signup' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "SecondUser",
    "email": "user12345@gmail.com",
    "password": "UserSecond#"
}'

2. Login

curl --location --request POST 'localhost:3000/login' \
--header 'Content-Type: application/json' \
--data-raw '{
     "email": "user12345@gmail.com",
    "password": "UserSecond#"
}'

3. Profile page – this page only logged in user can access. So copy the recent logged in user token and paste it in the authorization header like given below:

curl --location --request GET 'localhost:3000/users/profile' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmZlYzE0YmUyNmIwYTJhN2NhNzllZWQiLCJpYXQiOjE2MTA1MzEyNDN9.HgO-nHr1-Di6FrvO_hBX_0UBobGzavqM2zFrc_HI0kc'
