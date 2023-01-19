

# Registro Facturas

## This project was generated by [Flatlogic Platform](https://flatlogic.com).

  - Frontend: [Vue.js](https://flatlogic.com/templates?framework%5B%5D=vue&sort=default)

  - Design: [Material UI](https://flatlogic.com/templates?design%5B%5D=material&sort=default)

    <details><summary>Frontend Folder Structure</summary> 

    The generated application has the following frontend folder structure: 

    `src` folder which contains your working files that will be used later to create the build. the src folder contains folders as:

      - `assets` - contains image and other asset files to be copied as-is when you build your application;

      - `components` - this module contains the general components for CRUD:

        - `CRUD/Users` folder; 

        - `BreadcrumbHistory` folder;

        - `Colorpicker` folder;

        - `Filter` folder;

        - `Header` folder;

        - `Helper` folder;

        - `Layout` folder;

        - `Loader` folder;

        - `Sidebar` folder;

        - `Sparklines` folder;

        - `Uploaders` folder;

        - `Widjet` folder.

      - `mixins` - files where code contains mixins;

      - `plugins` - contains code of plugins;

      - `use` - contains dataFormatter.js;

      - `store` - that is, where all our states are stored, it's also contains `reducers` and `actions` folders;

      - `styles` - contains all .scss files of your application;

      - `pages` - this module consists of a collection of UI components of your project.

    `public` - is the web-accessible root of the site. Basically whatever is in that folder can be opened from the browser address bar. The server won't provide user access to files outside the public.
    </details>  

  - Backend: [NodeJS(TypeORM)](https://flatlogic.com/templates?backend%5B%5D=nodejs&sort=default)

  - Database: PostgreSQL

  -----------------------
### We offer 2 ways how to start the project locally: by running Frontend and Backend or with Docker.
-----------------------

## To start the project:

### Backend:

> Please change current folder: `cd backend`

#### Install local dependencies:
`yarn install`

Copy `.env` file as a new `.env.local`. Edit database credentials and anything you need in `.env.local` file. This file is ignored by git, and won't be uploaded anywhere.

------------

#### Adjust local db:
##### 1.  Install postgres:

MacOS:

`brew install postgres`

    > if you don’t have ‘brew‘ please install it (https://brew.sh) and repeat step `brew install postgres`.

Ubuntu:

`sudo apt update`

`sudo apt install postgresql postgresql-contrib`

##### 2. Create db and admin user:
Before run and test connection, make sure you have created a database as described in the above configuration. You can use the `psql` command to create a user and database.

`psql postgres --u postgres`

Next, type this command for creating a new user with password then give access for creating the database.

`postgres-# CREATE ROLE admin WITH LOGIN PASSWORD 'admin_pass';`

`postgres-# ALTER ROLE admin CREATEDB;`

Quit `psql` then log in again using the new user that previously created.

`postgres-# \q`

`psql postgres -U admin`

------------
#### Additional commands:

| Command | Description |
| - | - |
| yarn build | Compile typescript files into `dist` folder |
| yarn start | Run compiled code from `dist` folder |
| yarn db:create | Create database |
| yarn db:drop | Drop database schema  |  

#### Usage

Start local development with command below:

`yarn dev`

To run your code on production server, run several commands:

- Compile TS code

  `yarn build`

- Run compiled code in production mode

  `NODE_ENV=production yarn start`

### Frontend:

> Please change current folder: `cd frontend`

  Install dependencies via yarn

  `yarn install`

  Run development server

  `yarn start`

## To start the project with Docker:
### Description:

The project contains the **docker folder** and the `Dockerfile`.

The `Dockerfile` is used to Deploy the project to Google Cloud.

The **docker folder** contains a couple of helper scripts:

- `docker-compose.yml` (all our services: web, backend, db are described here)
- `start-backend.sh` (starts backend, but only after the database)
- `wait-for-it.sh` (imported from https://github.com/vishnubob/wait-for-it)

    > To avoid breaking the application, we recommend you don't edit the following files: everything that includes the **docker folder** and `Dokerfile`.

## Run services:

1. Install docker compose (https://docs.docker.com/compose/install/)

2. Move to `docker` folder. All next steps should be done from this folder.

   ``` cd docker ```

3. Make executables from `wait-for-it.sh` and `start-backend.sh`:

   ``` chmod +x start-backend.sh && chmod +x wait-for-it.sh ```

4. Download dependend projects for services.

5. Review the docker-compose.yml file. Make sure that all services have Dockerfiles. Only db service doesn't require a Dockerfile.

6. Make sure you have needed ports (see them in `ports`) available on your local machine.

7. Start services:

   7.1. With an empty database `rm -rf data && docker-compose up`

   7.2. With a stored (from previus runs) database data `docker-compose up`

8. Check http://localhost:3000

9. Stop services:

   9.1. Just press `Ctr+C`

## Most common errors:

1. `connection refused`

   There could be many reasons, but the most common are:

  - The port is not open on the destination machine.

  - The port is open on the destination machine, but its backlog of pending connections is full.

  - A firewall between the client and server is blocking access (also check local firewalls).

   After checking for firewalls and that the port is open, use telnet to connect to the IP/port to test connectivity. This removes any potential issues from your application.

   ***MacOS:***

   If you suspect that your SSH service might be down, you can run this command to find out:

   `sudo service ssh status`

   If the command line returns a status of down, then you’ve likely found the reason behind your connectivity error.

   ***Ubuntu:***

   Sometimes a connection refused error can also indicate that there is an IP address conflict on your network. You can search for possible IP conflicts by running:

   `arp-scan -I eth0 -l | grep <ipaddress>`

   `arp-scan -I eth0 -l | grep <ipaddress>`

   and

   `arping <ipaddress>`

2. `yarn db:create` creates database with the assembled tables (on MacOS with Postgres database)

   The workaround - put the next commands to your Postgres database terminal:

   `DROP SCHEMA public CASCADE;`

   `CREATE SCHEMA public;`

   `GRANT ALL ON SCHEMA public TO postgres;`

   `GRANT ALL ON SCHEMA public TO public;`

   Afterwards, continue to start your project in the backend directory by running:

   `yarn start`
