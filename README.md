# Ajaia AI-Native Full Stack Developer Assignment

## Overview

A collaborative document editor inspired by Google Docs.

## Features

* User Authentication (JWT)
* Create Documents
* Edit Documents
* Rich Text Editor
* Save Documents
* Share Documents with Other Users
* MongoDB Persistence
* TXT File Upload

## Tech Stack

### Frontend

* React
* React Router
* Axios
* React Quill

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication

## Installation

### Backend

```bash
cd Server
npm install
npm start
```

### Frontend

```bash
cd Client
npm install
npm run dev
```

## Environment Variables

Create a .env file inside Server folder:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
```

## Test Accounts

User 1:
Email: [rahul@test.com](mailto:rahul@test.com)
Password: 123456

User 2:
Email: [john@test.com](mailto:rahulkumar8340527941@gmail.com)
Password: 123456

## Implemented Features

* Authentication
* Document CRUD
* Rich Text Editing
* Sharing
* Persistence

## Future Improvements

* Real-time collaboration
* Version history
* PDF export
* Advanced permissions
