# Auth Service

Authentication Service in a Microservices Architecture <br />
Server is running on port 8000 <br />
Server Address : http://165.22.251.113/auth

# Features

- Create User Account
- Login
- Logout
- Edit User Profile
- Delete User Account

## To run the project
```
$ composer require tymon/jwt-auth:*
$ composer require league/flysystem-aws-s3-v3
$ php artisan migrate:fresh
$ php artisan serve
```

