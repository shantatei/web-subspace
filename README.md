# Subspace

<img src="./react-subspace/public/icon-512.png" width="200" align="left" height="fixed-content"  />
<p>Subspace is a social media community-based/forum website.Registered users are able to create communities and post related to any community. This project was created as my deliverables for CADV (Cloud Application Development) and DevOps (Development Operations) modules.</p>
<br clear="left"/>

## Overview
Subspace is build using microservices architecture which is part of the module requirement.The backend (Laravel) has been tested with PHPunit and the frontend (React Typescript) has been tested with Cypress.The test portion has been integrated into my Github Actions Pipeline and it will automatically test the application and ensure that it passed before deploying them to the servers.You can find them in the <a href="https://github.com/shantatei/web-subspace/actions">Actions</a> Tab.

## Tech Stack

| Layer | Technologies |
| --- | --- |
| **Frontend** | ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white) ![Chakra UI](https://img.shields.io/badge/chakra--ui-%23319795.svg?style=for-the-badge&logo=chakraui&logoColor=white) ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white) ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white) ![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white) ![Axios](https://img.shields.io/badge/axios-671ddf?&style=for-the-badge&logo=axios&logoColor=white) |
| **Backend** | ![Laravel](https://img.shields.io/badge/laravel-%23FF2D20.svg?style=for-the-badge&logo=laravel&logoColor=white) ![PHP](https://img.shields.io/badge/php-%23777BB4.svg?style=for-the-badge&logo=php&logoColor=white) ![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white) ![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white) |
| **Cloud & DevOps** | ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white) ![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white) ![AWS S3](https://img.shields.io/badge/AWS%20S3-%23569A31.svg?style=for-the-badge&logo=amazons3&logoColor=white) ![Nginx](https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white) ![Linode](https://img.shields.io/badge/linode-00A95C?style=for-the-badge&logo=linode&logoColor=white) ![DigitalOcean](https://img.shields.io/badge/DigitalOcean-%230167ff.svg?style=for-the-badge&logo=digitalOcean&logoColor=white) |
| **Testing** | ![Cypress](https://img.shields.io/badge/-cypress-%23E5E5E5?style=for-the-badge&logo=cypress&logoColor=058a5e) ![PHPUnit](https://img.shields.io/badge/PHPUnit-777BB4?style=for-the-badge&logo=php&logoColor=white) |

### Architecture

```mermaid
flowchart LR
    U[Browser] --> R[React + TypeScript SPA<br/>Nginx]
    R -->|:8000| A[Auth Service]
    R -->|:8001| C[Community Service]
    R -->|:8002| P[Post Service]
    R -->|:8003| M[Comment Service]
    A & C & P & M --> DB[(MySQL)]
    A & C & P --> S3[(AWS S3)]
```

## Feature Tour

Annotated screenshots highlight the controls behind each feature. Click an image to view it at full resolution.

**Home feed**

![Home feed with callouts for communities, posts and create actions](docs/screenshots/01-home.png)

**Themes and search**

![Light theme with callouts for search and the theme toggle](docs/screenshots/02-themes.png)

**Sign up and login**

![Sign up modal with callouts for the tabs, form and submit button](docs/screenshots/03-auth.png)

**Account settings**

![Settings page with callouts for profile picture, details and password](docs/screenshots/04-settings.png)

**Profiles**

![Profile page with callouts for identity, tabs and communities](docs/screenshots/05-profile.png)

**Communities**

![Community page with callouts for banner, owner controls, join or leave and members](docs/screenshots/06-community.png)

**Create a community**

![Create community modal with callouts for icon, banner and create button](docs/screenshots/07-create-community.png)

**Create a post**

![Create post page with callouts for community, title and image](docs/screenshots/08-create-post.png)

**Posts**

![Post modal with callouts for details, community panel and comment box](docs/screenshots/09-post.png)

**Comments**

![Comments with callouts for the composer, edit and delete, and roles](docs/screenshots/10-comments.png)

**Search**

![Search dropdown with callouts for suggestions and results](docs/screenshots/11-search.png)

## Features

- `Authentication`
    - Register
    - Login
    - Logout
    - Change Password
    - Edit Account
    - Delete Account
    - View Profile
        - Posts
        - Joined Communities
        - Owned Communities
    - View Other User's Profile
        - Posts
        - Joined Communities
        - Owned Communities
- `Community`
    - Create Community
    - Edit Community
    - Delete Community
    - Join Community
    - Leave Community
    - View Communities
    - Owner/Member Role

- `Post`
    - Users can Post in the community
    - Add Tags to Post 
    - Edit their Post
    - Delete their Post
    - Search Post

- `Comment`
    - View Comments
    - Post Comment
    - Edit their Comment
    - Delete their Comment

## Usage

### Locally

Ensure you have PHP,Composer,Node.js and Docker Installed in your local machine

#### Laravel-Backend

Configure the following in the .env file 
```
DB_CONNECTION=
DB_HOST=
DB_PORT=
DB_DATABASE=
DB_USERNAME=
DB_PASSWORD=

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=
AWS_BUCKET=
AWS_USE_PATH_STYLE_ENDPOINT=

JWT_SECRET=
```

Set up microservice configuration
```
$ cd 'Microservice Folder Here'
$ cp .env.example .env
$ php artisan migrate --seed
```
Running Docker Containers 
```
$ docker compose up --build
```

Running React
#### React-Frontend
```
$ cd react-subspace
$ npm i
$ npm run dev
```

### Deployment

Deployment is a bit different , but basically how I did was to have 2 servers , one for my backend and the other for my frontend.

#### Laravel Deployment Server
- Ensure you have `docker` and `docker-compose` installed on the server
- SSH into the server and install it manually (How I did it) 
```
$ cd ~
$ git clone this repo
$ cd web-subspace
$ docker-compose up -- build
```

#### React Deployment Server
- Configure Nginx in the server
- Drop the dist folder in /var/www/html according to your nginx config (Using STFP to drop folders in the server) after building the react project
```
$ cd react-subspace
$ npm i
$ npm run build
```

## Credits

- Much inspiration taken from Reddit 
- Used Linode to deploy my servers
- Used Digital Ocean for MySQL Database

## Tests

### Laravel

```
$ php artisan test ||  vendor/bin/phpunit
```

### React

```
$ npm run cypress:open
```
