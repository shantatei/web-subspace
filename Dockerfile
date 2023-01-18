FROM php:8.1-apache

WORKDIR /var/www/html

RUN apt-get update
RUN apt-get install -y g++ libicu-dev libpq-dev libzip-dev zip zlib1g-dev
RUN docker-php-ext-install mysqli pdo pdo_mysql
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

COPY . .

COPY apache.conf /etc/apache2/sites-enabled/000-default.conf

# COPY apache.conf /etc/apache2/sites-available/dev.subspace.conf
# COPY apachehttps.conf /etc/apache2/sites-available/dev.subspace-ssl.conf

COPY ./certs/private_key.pem /etc/apache2/ssl/private_key.pem
COPY ./certs/cert.pem /etc/apache2/ssl/cert.pem

RUN composer install --no-dev

# RUN ln -s /etc/apache2/mods-available/ssl.load  /etc/apache2/mods-enabled/ssl.load
RUN chown -R $USER:www-data storage
RUN chown -R $USER:www-data bootstrap/cache
RUN chmod -R 775 storage
RUN chmod -R 755 bootstrap/cache
RUN a2enmod rewrite
RUN a2enmod ssl

# RUN a2ensite dev.subspace
# RUN a2ensite dev.subspace-ssl

RUN apt-get clean

EXPOSE 80
EXPOSE 443