# Auth Service

Authentication Service in a Microservices Architecture <br />
Server is running on port 8000 <br />
Server Address : http://174.138.30.99:8000

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
$ php artisan migrate --seed
$ php artisan serve
```

