# Post Service

Post Service in a Microservices Architecture <br />
Server is running on port 8002 <br />
Server Address : http://139.162.50.175:8002

# Features

- Users can post in the community
- Users can specifiy what type of post they are posting (Normal Post / Poll)
- Users can also add tags to their post 
- Edit their post
- Delete their post
- Filter post through tags

## To run the project
```
$ composer require tymon/jwt-auth:*
$ composer require league/flysystem-aws-s3-v3
$ php artisan migrate --seed
$ php artisan serve
```
