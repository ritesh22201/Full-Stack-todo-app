# melodious-rabbit3105

# Full-Stack Todo App

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Code Coverage](https://img.shields.io/badge/coverage-90%25-green)
![License](https://img.shields.io/badge/license-MIT-blue)

A full-stack todo app built using React.js, Redux.js, TypeScript, Node.js, Express.js, MongoDB, and Chakra UI.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Backend](#backend)
- [Frontend](#frontend)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Configuration](#configuration)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)
- [License](#license)
- [Contact](#contact)
- [Acknowledgments](#acknowledgments)

## Introduction

Welcome to the Full-Stack Todo App! This app allows you to manage your tasks efficiently. It provides a user-friendly interface powered by Chakra UI and leverages React.js, Redux.js, TypeScript, Node.js, Express.js, and MongoDB to ensure seamless task management.

## Features

- Create, update, and delete tasks
- Mark tasks as complete
- Filter tasks by status (completed/uncompleted)
- Filter tasks by date
- Responsive design with Chakra UI components

## Technologies Used

- Frontend:
  - React.js
  - Redux.js
  - TypeScript
  - Chakra UI

- Backend:
  - Node.js
  - Express.js
  - MongoDB

## Installation

1. Clone the repository: `git clone https://github.com/ritesh22201/melodious-rabbit3105.git`
2. Navigate to the project directory: `cd melodious-rabbit3105`
3. Install frontend dependencies: `cd frontend && npm install`
4. Install backend dependencies: `cd back-end && npm install`
5. Create a MongoDB database and update the configuration in `back-end/.configs/db.js`

## Usage

1. Start the backend server: `cd back-end && npm run server`
2. Start the frontend development server: `cd frontend && npm start`
3. Open your browser and visit: `http://localhost:3000`

## Backend

The backend is built using Node.js and Express.js. It provides RESTful APIs for managing tasks and communicates with the MongoDB database.

## Frontend

The frontend is built using React.js, Redux.js, and TypeScript, offering an intuitive user interface for managing tasks efficiently.

## API Documentation

- `GET /todo/`: Get a list of all tasks.
- `POST /todo/addTodo`: Create a new task.
- `PUT /todo/update/:id`: Update an existing task.
- `DELETE /todo/delete/:id`: Delete a task.
- `PATCH /todo/update/:id`: Mark a task as complete.

## Database Schema

The MongoDB database schema consists of a `todos` collection with fields like `title`, `description`, `completed`, etc.

## Configuration

Confuguration is set up in MongoDB, by setting up the environment variables in .env file and setting up the database connection in `.configs/db.js`

## Deployment

For deployment, Render for the backend and Vercel for the frontend. Updated environment variables accordingly.

## Contact

For any inquiries, contact me at riteshgoswami22201@gmail.com.

## Acknowledgments

- Thanks to the creators of React.js, Redux.js, Node.js, Express.js, MongoDB, and Chakra UI for their fantastic tools.
- Special thanks to the open-source community for their valuable contributions.

---
© 2023 Full-Stack Todo App. All Rights Reserved.
