# AI-Based Auto-Evaluation System

## Overview

Welcome to the AI-Based Auto-Evaluation System! This project is designed to automate the evaluation of multiple-choice questions (MCQs) using an advanced AI model. It leverages a combination of React for the frontend and Django for the backend. The system utilizes the Gemini model to convert scanned pages into digital text and automatically formulate and provide answers.

## Features

- **Automated MCQ Checking**: Seamlessly evaluates and provides answers for multiple-choice questions.
- **AI Integration**: Uses the Gemini model to convert scanned pages to digital text for accurate evaluation.
- **User-Friendly Interface**: Built with React for an intuitive and interactive user experience.
- **Robust Backend**: Powered by Django to handle data management and server-side logic.


## Installation

### Backend Setup

1. **Clone the Repository**

    ```bash
    git clone (https://github.com/FahadJafar/Automotive-Marketplace.git)
    cd my_project
    ```

2. **Navigate to the Backend Directory**

    ```bash
    cd backend
    ```

3. **Create a Virtual Environment**

    ```bash
    python -m venv venv
    ```

4. **Activate the Virtual Environment**

    - On Windows:

        ```bash
        venv\Scripts\activate
        ```

    - On macOS/Linux:

        ```bash
        source venv/bin/activate
        ```

5. **Install Dependencies**

    ```bash
    pip install -r requirements.txt
    ```

6. **Configure Database**

    Update the `DATABASES` settings in `my_django_app/settings.py` with your database credentials.

7. **Run Migrations**

    ```bash
    python manage.py makemigrations
    python manage.py migrate
    ```

8. **Start the Django Server**

    ```bash
    python manage.py runserver
    ```

### Frontend Setup

1. **Navigate to the Frontend Directory**

    ```bash
    cd ../frontend
    ```

2. **Install Dependencies**

    ```bash
    npm install
    ```

3. **Start the React Development Server**

    ```bash
    npm start
    ```

## Using the AI Model

The system integrates the Gemini model for text recognition and evaluation. Ensure you have the model and any necessary libraries installed. You may need to configure the model settings and paths in the Django backend.

## Contributing

Feel free to submit issues, pull requests, or suggestions for improvements. Please ensure that you follow the contribution guidelines and adhere to the project's coding standards.

## Acknowledgements

- **Gemini Model**: For advanced text recognition capabilities.
- **React**: For a responsive frontend.
- **Django**: For a powerful backend framework.

Thank you for checking out the AI-Based Auto-Evaluation System!

