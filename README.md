
# Fitmate API

## Overview

Welcome! This is a Node.js app that uses TypeScript to give you a modern, efficient backend. Let me walk you through why I chose each part of this tech stack and how it all fits together.

## Why This Tech Stack?

### Node.js
So, I'm using Node.js here because it’s fantastic for handling lots of requests at the same time. Its non-blocking nature means it doesn’t get bogged down waiting for one thing to finish before moving on to the next. Perfect for building fast, scalable applications.

### TypeScript

TypeScript is like JavaScript’s older sibling who’s good at catching mistakes before you even run your code. It adds static typing to JavaScript, which helps avoid those annoying runtime errors and makes the code easier to understand and maintain. It’s especially useful in a big project where type errors can be a real pain to track down.

### Express

For the server-side framework, I picked Express. It’s like a Swiss Army knife for building web apps with Node.js. Express is lightweight, flexible, and has a huge ecosystem of middleware to handle everything from sessions to security. If you’ve ever worked with Node.js for web apps, you’ve probably used Express — it just makes life easier.

### PostgreSQL and `pg`

When it comes to databases, PostgreSQL is my go-to. It’s reliable, has strong support for complex queries, and handles large datasets well. The `pg` package lets Node.js talk to PostgreSQL easily, making it straightforward to execute queries and manage the database.

### Drizzle ORM and `drizzle-kit`

Now, for ORM (Object-Relational Mapping), I’m using Drizzle ORM with `drizzle-kit`. ORMs help map database tables to objects in your code, which means you can work with your data using objects instead of raw SQL queries. Drizzle ORM is modern and integrates well with PostgreSQL. The `drizzle-kit` helps with migrations and generating TypeScript types, so you can keep your database schema and code in sync without a hassle.

### Middleware Libraries

- **body-parser**: This is for parsing incoming request bodies. It’s essential for handling JSON payloads or form data.
- **compression**: It compresses your responses to make your app faster and use less bandwidth. It’s a no-brainer for improving performance.
- **cookie-parser**: If your app uses cookies, this middleware will help you read and manage them easily.
- **cors**: This handles Cross-Origin Resource Sharing (CORS) issues. It’s needed if your API will be accessed from different domains or front-end apps.

### Development Tools

- **nodemon**: This tool watches your files and restarts the server whenever you make changes. It’s a real time-saver during development.
- **ts-node**: This lets you run TypeScript directly without having to compile it first. It’s super convenient for development.
- **typescript**: Obviously, we’re using TypeScript here for all the reasons mentioned earlier—better type safety and all that jazz.

## Getting Started

1. **Clone the repo:**

   ```bash
   git clone https://github.com/kkupishevska/fitmate-server.git
2. **Navigate into the project directory:**
    ```bash
    cd fitmate-server
3. **Install the dependencies:**
	```bash
	bun install
4. **Set up your environment variables.** Create a `.env` file in the root of the project.
    
5. **Start the app:**
    ```bash
    bun start