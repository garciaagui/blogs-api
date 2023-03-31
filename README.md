<a name="readme-top"></a>

<h1 align="center">Blogs API 📑</h1>

> [🇧🇷 Clique aqui para acessar a versão em português.](README_pt-br.md)

## Summary

<ol>
  <li><a href="#description">Description</a></li>
  <li><a href="#technologies">Technologies</a></li>
  <li><a href="#features">Features</a></li>
  <li><a href="#how-to-run">How to Run</a></li>
  <li><a href="#endpoints">Endpoints</a></li>
  <li><a href="#about-trybe">About Trybe</a></li>
  <li><a href="#contact">Contact</a></li>
</ol>

## Overview

**22nd project** of the [Trybe][trybe-site-url] Web Development course.

The application consists of an API and a database designed specifically for content management in blogs. Developed in Node.js, it uses Sequelize to model data efficiently. It follows the MSC (Model-Service-Controller) architecture and REST standard principles.

To ensure the security of information, all CRUD (create, read, update, and delete) operations are preceded by JWT token authentication. This means that the user needs to provide correct credentials to perform an operation, thus maintaining the integrity of the data.

<details>
  <summary><strong>🎲 Here you can go deeper into the database structure.</strong></summary>

#### Entity-Relationship Diagram

![DER](./public/der.png)

> ℹ️ Image created and provided by Trybe.

---

#### Entities format

The data below are fictitious and used only to exemplify the structure of the database tables.

- A table called `users`, with the following structure:

  | id  | display_name    | email                             | password | image                                                                                               |
  | --- | --------------- | --------------------------------- | -------- | --------------------------------------------------------------------------------------------------- |
  | 1   | Brett Wiltshire | brett@email.com // Must be unique | 123456   | http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png // Optional |

- A table called `categories`, with the following structure:

  | id  | name |
  | --- | ---- |
  | 18  | News |

- A table called `blog_posts`, with the following structure:

  | id  | title                      | content                                                | user_id                                          | published                | updated                  |
  | --- | -------------------------- | ------------------------------------------------------ | ------------------------------------------------ | ------------------------ | ------------------------ |
  | 21  | Latest updates, August 1st | The whole text for the blog post goes here in this key | 14 // Foreign key, referencing the id of `users` | 2011-08-01T19:58:00.000Z | 2011-08-01T19:58:51.947Z |

- A table called `posts_categories`. Contains a **composite primary key** using the two attributes of the structure:

  | post_id                                                               | category_id                                                           |
  | --------------------------------------------------------------------- | --------------------------------------------------------------------- |
  | 50 // Primary key and foreign key, referencing the id of `blog_posts` | 20 // Primary key and foreign key, referencing the id of `categories` |

  </details>

<br/>

## Technologies

- [Docker][docker-url]
- [dotenv][dotenv-url]
- [ESLint][eslint-url]
- [Express][express-url]
- [JavaScript][javascript-url]
- [Joi][joi-url]
- [JWT][jwt-url]
- [MySQL][mysql-url]
- [Node.js][node-url]
- [Nodemon][nodemon-url]
- [Sequelize][sequelize-url]

<br/>

## Features

<ul>
  <li>User login.</li>
  <li>JWT token generation and authentication.</li>
  <li>Create, list, and delete users.</li>
  <li>Create and list categories.</li>
  <li>Create, list, update, and delete posts.</li>
</ul>

<br/>

## How to Run

To run the project, follow the steps below.

1. Clone the repository;

```
git clone git@github.com:garciaagui/blogs-api.git
```

2. Navigate to the project root;

```
cd blogs-api/
```

> ⚠️ Now, decide whether the project will be run locally or via Docker.

<details>
  <summary><strong>💽 Locally</strong></summary>

1. Make sure you have **Node.js** installed in version 16 or higher. Check out the [official documentation](https://nodejs.org/en/download/package-manager) for more information.

2. In the project root, install the project dependencies.

```
npm install
```

3. Configure the environment variables:

- Rename the `.env.example` file (available in the project root) to `.env`;
- Set the `MYSQL_HOST`, `MYSQL_PORT`, `MYSQL_USER`, `MYSQL_PASSWORD` variables for your local environment.

4. Create and populate the database with the command below.

```
npm run prestart
```

5. To start the server, use one of the commands below.

```
// Command 1 - Needs to be run again in case of code changes
npm run start

// Command 2 - Restarts the server automatically if there is any code change
npm run nodemon
```

</details>

<details>
  <summary><strong>🐋 Docker</strong></summary>

1. Make sure you have **docker-compose** installed in version 1.29 or higher. Useful links if you need to install or update: [DigitalOcean Tutorial](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-20-04) and [official documentation](https://docs.docker.com/compose/install/);

2. Bring up the containers by running the command below. Two containers will be initialized: `blogs_api` (node) and `blogs_api_db` (mysql).

```
docker-compose up -d --build
```

3. Access the CLI of the `blogs_api` container with the command below or open it in VS Code. For the latter option, I recommend the Microsoft extension [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers).

```
docker exec -it blogs_api bash
```

> ⚠️ From now on, **ALL** commands (scripts) available in `package.json` (including npm install) must be executed **INSIDE** the `blogs_api` container.

4. Install the project dependencies.

```
npm install
```

5. Create and populate the database with the command below.

```
npm run prestart
```

6. To start the server, use one of the commands below.

```
// Command 1 - Needs to be run again in case of code changes
npm start

// Command 2 - Restarts the server automatically if there are any code changes
npm run nodemon
```

- For the local test context, follow the steps below.

1. Rename the `.env.example` file (available at the root of the project) to `.env`;
2. Configure the `MYSQL_HOST`, `MYSQL_PORT`, `MYSQL_USER`, `MYSQL_PASSWORD` variables for your local context.

</details>

<br/>

## Endpoints

Below you can find a breakdown of the endpoints used in the project. To make HTTP requests and check the behavior of each endpoint, you can use the [Thunder Client](https://www.thunderclient.com/) extension.

> ⚠️ Pay attention to the token generated during login, it will be necessary for all operations. Remember that its expiration time is 1 hour.

<details>
  <summary><strong>Login</strong></summary>

### POST /login

- Validates the user's login and returns a token generated with jsonwebtoken (JWT).
- The generated token must be inserted in the `Authorization` header to authenticate other operations. Remember to save it and keep in mind that **its expiration time is 1 hour**.
- URL: `http://localhost:PORT/login`
- The request body must follow the format below:

```
{
  "email": "lewishamilton@gmail.com",
  "password": "123456"
}
```

---

</details>

<details>
  <summary><strong>User</strong></summary>

### GET /user

- Returns all the users registered in the database.
- URL: `http://localhost:PORT/user`

### GET /user/:id

- Returns the user whose id was passed in the endpoint.
- Example URL: `http://localhost:PORT/user/1`

### POST /user

- Adds a new user to the database.
- URL: `http://localhost:PORT/user`
- The request body must follow the format below:

```
{
  "displayName": "Brett Wiltshire",
  "email": "brett@email.com",
  "password": "123456",
  "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"

  // image is optional
}
```

### DELETE /user/me

- Deletes the logged-in user based on the id inside the token.
- URL: `http://localhost:PORT/user/me`

---

</details>

<details>
  <summary><strong>Categories</strong></summary>

### GET /categories

- Returns all the categories registered in the database.
- URL: `http://localhost:PORT/categories`

### POST /categories

- Adds a new category to the database.
- URL: `http://localhost:PORT/categories`
- The request body must follow the format below:

```
{
  "name": "Typescript"
}
```

---

</details>

<details>
  <summary><strong>Post</strong></summary>

### GET /post

- Returns all the blog posts registered in the database.
- URL: `http://localhost:PORT/post`

### GET /post/:id

- Returns the blog post whose id was passed in the endpoint.
- Example URL: `http://localhost:PORT/post/1`

### GET /post/search

- Returns all the blog posts whose `title` or `content` contains the searched term in the query.
- Example URL: `http://localhost:PORT/post/search?q=vamos`

### POST /post

- Adds a new blog post to the database.
- URL: `http://localhost:PORT/post`
- The request body must follow the format below:

```
{
  "title": "Latest updates, August 1st",
  "content": "The whole text for the blog post goes here in this key",
  "categoryIds": [1, 2]
}
```

### PUT /post/:id

- Updates the blog post whose id was passed in the endpoint.
- Example URL: `http://localhost:PORT/post/1`
- The request body must follow the format below:

```
{
  "title": "Latest updates, August 1st",
  "content": "The whole text for the blog post goes here in this key"
}
```

### DELETE /post/:id

- Deletes the blog post whose id was passed in the endpoint.
- Example URL: `http://localhost:PORT/post/1`

---

</details>

<br/>

## About Trybe

_"[Trybe][trybe-site-url] is a future school for anyone who wants to improve their lives and build a successful career in technology, where the person only pays when they get a good job."_

_"The program features over 1,500 hours of online classes covering introduction to software development, front-end, back-end, computer science, software engineering, agile methodologies, and behavioral skills."_

<br/>

## Contact

Project developed by **Guilherme Garcia**. Below are my social networks and means of contact. 🤘

[![Gmail][gmail-badge]][gmail-url]
[![Linkedin][linkedin-badge]][linkedin-url]
[![GitHub][github-badge]][github-url]
[![Instagram][instagram-badge]][instagram-url]

<p align="right"><a href="#readme-top">Back to top</a></p>

<!-- MARKDOWN LINKS & IMAGES -->

<!-- Useful URLs -->

[trybe-site-url]: https://www.betrybe.com/

<!-- Stacks URLs -->

[docker-url]: https://www.docker.com/
[dotenv-url]: https://www.dotenv.org/
[eslint-url]: https://eslint.org/
[express-url]: https://expressjs.com/
[javascript-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript
[joi-url]: https://joi.dev/api/?v=17.7.0
[jwt-url]: https://jwt.io/
[mysql-url]: https://www.mysql.com/
[node-url]: https://nodejs.org/en/
[nodemon-url]: https://nodemon.io/
[sequelize-url]: https://sequelize.org/

<!-- Contact URLs & Badges -->

[gmail-badge]: https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white
[gmail-url]: mailto:garciaguig@gmail.com
[linkedin-badge]: https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white
[linkedin-url]: https://www.linkedin.com/in/garciaagui/
[github-badge]: https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white
[github-url]: https://github.com/garciaagui
[instagram-badge]: https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white
[instagram-url]: https://www.instagram.com/garciaagui/
