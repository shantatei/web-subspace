# Comment Service

Comment Service in a Microservices Architecture 
Server is running on port 8003

# Features

- Other users are able to comment on different users post
- Edit their comment
- Delete their comment

## To run the project
```
$ composer require tymon/jwt-auth:*
$ composer require league/flysystem-aws-s3-v3
$ php artisan migrate:fresh --seed
$ php artisan serve
```
