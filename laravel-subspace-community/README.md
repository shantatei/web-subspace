# Community Service

Community Service in a Microservices Architecture <br />
Server is running on port 8001 <br />
Server Address : http://139.162.50.175:8001

# Features

- Create Community
- Join Community
- Leave Community
- Owners are able to assign roles to users in their community

## To run the project
```
$ composer require tymon/jwt-auth:*
$ composer require league/flysystem-aws-s3-v3
$ php artisan migrate --seed 
$ php artisan serve --port=8001
```
