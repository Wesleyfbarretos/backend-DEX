# Pokedex Backend API

## About this Project

Information about all pokemons.

## Why
_"a local pokemon API for you to build your front end"_

I wanted a way to build my front end without having to use [Pokeapi](https://pokeapi.co), one day I had this thought "will they ever discontinue the project?" so I decided to do some web scraping and have something of my own.

**So here is!**

## Functionalities

- You can get information such as name, images, skills, types, number in pokedex, status.
- Get a list of pokemons and choose how many pokemons you want to jump or how many you want to catch.
- Get a single pokemon.
- Add new pokemons.
- Updated a pokemon.
- Delete a pokemon.
- Get a list of skills.
- Get a single ability, which also brings up a list of all the pokemons that have it.
- Get a list of types.
- Get a single type, which also brinks up a list of all the pokemons that have it.

## Getting Started

### Prerequisites

If you have Docker the first installation process we will use it. If you don't have it i'll leave a tutorial [here](https://github.com/codeedu/wsl2-docker-quickstart) that works for both windows and linux, if you are on a mac the tutorial is [here](https://docs.docker.com/desktop/install/mac-install/). If you don't want to download Docker, below we also have the installation process without the use of Docker.

**That said, let's go!**

### Installing with Docker

**Cloning the Repository**

```
$ git clone https://github.com/Wesleyfbarretos/backend-DEX.git

$ cd backend-DEX
```

**.env file**

Now you just have to create an .env at the root of project and give value to the environment variables.
```
TYPEORM_HOST=
TYPEORM_PORT=
TYPEORM_USERNAME=
TYPEORM_PASSWORD=
TYPEORM_DATABASE=
```

**Docker CLI**

Now you just need to type the following command in the project's root terminal and the project will be running on the http://localhost:8080/pokemon port.

```
$ docker compose up
```

**PS:** It may take some time, because when the container goes up, a lot of information will be entered into the database. If any errors happen, just go into the back-end container and type npm run dev after the inserts have finished.

## Installing without Docker

**Cloning the Repository**

```
$ git clone https://github.com/Wesleyfbarretos/backend-DEX.git

$ cd backend-DEX
```

**Installing dependencies**

```
$ yarn
```

_or_

```
$ npm install
```

**PostgresSQL Install**

You will have to [download](https://www.postgresql.org/download/) Postgres locally on your machine and create a new database that you will use as a reference in the .env file.

**Database Dump**

After installing Postgres and creating the database you need to run the dump file on the database, it is located in the directory below.

```
root/db/dump.sql
```

**.env file**

Now you just have to create an .env at the root of project and give value to the environment variables.
```
TYPEORM_HOST=
TYPEORM_PORT=
TYPEORM_USERNAME=
TYPEORM_PASSWORD=
TYPEORM_DATABASE=
```

**Running**

```
$ yarn dev
```

_or_

```
$ npm run dev
```

