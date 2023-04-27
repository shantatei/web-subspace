setup:
	@make build
	@make up 
	@make composer-update
build:
	docker-compose build --no-cache --force-rm
stop:
	docker-compose stop
up:
	docker-compose up -d
data:
	docker exec laravel-subspace-authentication bash -c "php artisan migrate --seed"
	docker exec laravel-subspace-comment bash -c "php artisan migrate --seed"
	docker exec laravel-subspace-community bash -c "php artisan migrate --seed"
	docker exec laravel-subspace-post bash -c "php artisan migrate --seed"

