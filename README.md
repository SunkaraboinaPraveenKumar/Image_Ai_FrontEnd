# Image Generation App

A full-stack application that utilizes Hugging Face's model for generating images based on user prompts.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Frontend](#frontend)
- [Backend](#backend)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features

- Generate images using the Hugging Face API.

- Store generated images in Firebase.

- Responsive frontend built with React and Tailwind CSS.

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, Firebase.

- **Backend:** Express, Hugging Face API, Axios, MongoDB, Nodemon.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/SunkaraboinaPraveenKumar/Ai_Image_gen.git
   ```
2. Navigate to the project directory:
   ```bash
   cd frontend
   ```
3. Install dependencies for the frontend:
   ```bash
   npm install
   ```
4. Navigate to the backend:
   ```bash
   cd backend
   ```
5. Install dependencies for the backend:
   ```bash
   npm install
   ```
6. Configure environment variables for the backend:
   Create a .env file in the backend directory and add your Firebase and Hugging Face API credentials.

## Usage

To start the development servers:

For the frontend:
   ```bash
   cd frontend
   npm run dev
   ```
For the backend:
   ```bash
   cd backend
   npm start
   ```

Access the application in your browser at [http://localhost:5173](http://localhost:5173) (frontend) and the backend API at [http://localhost:8080/api/v1/dalle](http://localhost:8080/api/v1/dalle).

## API Endpoints

- `POST /api/v1/dalle` - Generate an image based on a prompt.

## Frontend

The frontend is built with React and styled using Tailwind CSS. It communicates with the backend API to generate and display images.

## Backend

The backend is built with Express and utilizes the Hugging Face inference API to generate images based on user input. All generated images are stored in Firebase.

## Deployment

Frontend: https://image-ai-front-end.vercel.app/

Backend: https://image-ai-backend-five.vercel.app/api/v1/dalle

## Contributing

Feel free to submit issues or pull requests if you would like to contribute to this project.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

