# Comment Service

Comment Service in a Microservices Architecture <br />
Server is running on port 8003 <br />
Server Address : http://139.162.50.175:8003

# Features

- Other users are able to comment on different users post
- Get comments
- Edit their comment
- Delete their comment
## To run the project
```
$ composer require tymon/jwt-auth:*
$ composer require league/flysystem-aws-s3-v3
$ php artisan migrate --seed
$ php artisan serve
```
