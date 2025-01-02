# Notes Management Application Using React

A feature-rich application for managing notes with authentication, a customizable interface, and a responsive design.

---

## Table of Contents
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Setup Locally](#setup-locally)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Getting Started](#getting-started)

---

## Features

- **Custom User Authentication**: Secure authentication with password management.
- **User Account Management**: Create and manage user accounts.
- **CRUD Operations**: Add, edit, delete, and view notes.
- **Light/Dark Theme**: Toggle between light and dark themes.
- **Responsive Design**: Optimized for various screen sizes.
- **Extendable UI**: Built with [shadcn/ui](https://shadcn.dev/).
- **Routing**: Seamless navigation using `react-router-dom`.

---

## Prerequisites

Before setting up the application, ensure you have the following:
- **MongoDB Connection URL**: A running MongoDB instance.
- **Node.js**: Installed on your system.
- **Yarn**: For dependency management (optional, you can use npm if preferred).

---

## Setup Locally

Follow these steps to set up the application locally:

### Backend Setup
1. Navigate to the `server` directory and copy the environment example file:
   ```bash
   cd server && cp .env.example .env
   ```
2. Update the `.env` file with your credentials:
   ```env
   JWT_SECRET="your-secret-key"
   MONGO_URL="mongodb://localhost:27017/noteapp"
   CLIENT_URL="http://localhost:4173"
   ```
3. Start the backend server:
   ```bash
   yarn start
   ```

### Frontend Setup
1. Navigate to the `client` directory and copy the environment example file:
   ```bash
   cd client && cp .env.example .env
   ```
2. Update the `.env` file with your API URL:
   ```env
   VITE_API_URL=http://localhost:3000/api
   ```
3. Start the frontend application:
   ```bash
   yarn preview
   ```

---

## Getting Started

Once both the backend and frontend are set up and running:
1. Open your browser and navigate to `http://localhost:4173`.
2. Create an account, log in, and start managing your notes!

---

### Additional Notes
- Ensure MongoDB is running before starting the backend server.
- Use `yarn` or `npm` consistently for dependency management.
- For production deployments, make sure to replace development URLs and secrets with production-ready values.

---

Happy coding!

