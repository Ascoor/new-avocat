FROM php:8.2-cli

# Install system dependencies
RUN apt-get update \
  && apt-get install -y --no-install-recommends \
    git \
    unzip \
    libpq-dev \
    libzip-dev \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    libonig-dev \
    libxml2-dev \
    netcat-openbsd \
  && docker-php-ext-configure gd --with-freetype --with-jpeg \
  && docker-php-ext-install \
    pdo \
    pdo_pgsql \
    pdo_mysql \
    pdo_sqlite \
    zip \
    gd \
    bcmath \
    pcntl \
  && rm -rf /var/lib/apt/lists/*

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Set workdir
WORKDIR /var/www/html

# Copy dependency definitions first for caching
COPY composer.json composer.lock ./
RUN composer install --no-interaction --no-plugins --no-scripts --no-progress --prefer-dist

# Copy application code
COPY . .

# Ensure storage writable
RUN mkdir -p storage/framework/{cache,sessions,views} storage/logs \
  && chown -R www-data:www-data storage bootstrap/cache \
  && chmod +x docker-entrypoint.sh

ENV APP_PORT=8000
EXPOSE 8000

CMD ["bash", "docker-entrypoint.sh"]
