# Community Service

Community Service in a Microservices Architecture 
Server is running on port 8001
Server Address : http://165.22.251.113/community

# Features

- Create Community
- Join Community
- Leave Community
- Owners are able to assign roles to users in their community

## To run the project
```
$ composer require tymon/jwt-auth:*
$ composer require league/flysystem-aws-s3-v3
$ php artisan migrate:fresh --seed --seeder=CommunityRolesTableSeeder
$ php artisan serve --port=8001
```
