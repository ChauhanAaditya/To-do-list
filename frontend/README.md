📝 Full-Stack To-Do Application

A clean, modern full-stack To-Do application built with Flask and React, featuring a polished UI, dark mode, smooth animations, and persistent storage.

The app allows users to manage tasks efficiently with real-time UI updates and a calm, user-friendly design.

✨ Features

➕ Add, complete, and delete tasks

🌙 Light / Dark mode with smooth transitions

🎞️ Animated task interactions (add/remove)

📊 Progress tracking

💾 Persistent storage using SQLite

🎨 Modern, eye-pleasing UI

🔌 RESTful API architecture

🛠️ Tech Stack
Frontend

React

Axios

Framer Motion (animations)

CSS (custom styling)

Backend

Python

Flask

Flask-SQLAlchemy

SQLite

Flask-CORS


🧠 Architecture Overview

React (Frontend)
   │
   │  HTTP (Axios)
   ▼
Flask REST API
   │
   ▼
SQLite Database


📁 Project Structure
To-do-list/
├── backend/
│   ├── app.py
│   ├── tasks.db
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── App.js
│   │   ├── App.css
│   │   └── services/api.js
│   ├── package.json
│   └── package-lock.json
│
├── .gitignore
└── README.md
