# QwizR: Interactive Digital Assessment Platform for Young Learners

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
  - [Student Experience](#student-experience)
  - [Teacher Tools](#teacher-tools)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Advantages and Disadvantages](#advantages-and-disadvantages)
- [Contributing](#contributing)
- [License](#license)

## Introduction
QwizR is a specialized online examination platform designed to cater specifically to the needs of school children in primary education. It aims to provide an age-appropriate digital assessment system that complements traditional teaching methods. The platform offers interactive and engaging elements necessary for younger children, making test creation and evaluation more efficient for teachers.

## Features

### Student Experience
- **Interactive Drawing Board**: For alphabet practice.
- **Picture-Based Matching Exercises**: Visual-enhanced assessments.
- **Video-Assisted Questions**: To aid comprehension.
- **Digital Whiteboard**: For solving mathematical problems.
- **Simple and Intuitive Interface**: Child-friendly design.
- **Encouraging Feedback System**: Immediate and positive feedback.

### Teacher Tools
- **AI-Powered Question Suggestion System**: Helps generate content.
- **Easy-to-Use Test Creation Interface**: Simplifies test design.
- **Multiple Question Format Templates**: Diverse assessment options.
- **Assessment Customization Options**: Tailor tests to specific needs.
- **Real-Time Monitoring Capabilities**: Track student progress efficiently.

## Technologies Used
- **MongoDB**: For database management.
- **Express.js**: A Node.js web application framework for building the backend API.
- **React**: A JavaScript library for building the user interface.
- **Node.js**: A JavaScript runtime environment for server-side logic.
- **JWT (JSON Web Tokens)**: For authentication.

## Installation
1. **Clone the repository:**
    ```bash
    git clone https://github.com/navjot369/QwizR.git
    ```
2. **Navigate to the project directory:**
    ```bash
    cd QwizR
    ```
3. **Install backend dependencies:**
    ```bash
    cd server
    npm install
    ```
4. **Install frontend dependencies:**
    ```bash
    cd ../client
    npm install
    ```
5. **Set up environment variables:**
   Create a `.env` file in the `backend` directory and add the following:
    ```env
    MONGODB_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    ```

## Usage
1. **Start the backend server:**
    ```bash
    cdserver
    npm start
    ```
2. **Start the frontend development server:**
    ```bash
    cd ../client
    npm start
    ```
3. **Open your browser and navigate to:**
    ```
    http://localhost:3000
    ```

## Project Structure
```
QwizR/
│
├── server/           # Backend code (Express.js)
├── client/           # Frontend code (React)
├── README.md         # Project README file
└── .env.example      # Example environment variables file
```
(yet to complete)

## Contributing
We welcome contributions to QwizR! If you have suggestions, bug reports, or improvements, please open an issue or submit a pull request. Make sure to follow the contribution guidelines.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
