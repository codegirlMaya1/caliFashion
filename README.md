CaliFashion is a fullstack AI-powered shopping assistant built using a modern technology stack that includes a React frontend, a Flask backend, and OpenAI integration for natural language processing. The application also leverages Playwright for automated testing and simulation of user interactions. This stack demonstrates how artificial intelligence can be seamlessly integrated into web applications to create intelligent, voice-driven user experiences.
The purpose of CaliFashion is to showcase the power of AI in a simulated shopping environment. Users interact with a virtual assistant that can understand voice commands, navigate to specific product categories, and add items to the shopping bag—all without manual clicks. This kind of automation is particularly useful in accessibility-focused applications, smart kiosks, virtual shopping assistants, and customer service bots. It can also be extended to support multilingual voice interfaces, personalized recommendations, and hands-free shopping experiences in retail environments.
To set up and run CaliFashion locally, follow these steps:


Navigate to the fsl directory inside your cloned repository. This directory contains both the frontend and backend components of the application.


Inside the fsl directory, create a file named .env. In this file, add your OpenAI API key using the format: OPENAI_API_KEY=your-key-here. This key is essential for enabling the voice assistant functionality powered by OpenAI.


Install the frontend dependencies by running npm install from the fsl directory. This will install all necessary packages required to run the React application.


Open a terminal and navigate to the fsl/backend directory. Start the Flask backend server by executing the command python app.py. Keep this terminal open to allow the backend to run continuously and serve API requests.


Open a second terminal window and return to the fsl directory. Start the React development server by running the command npm run dev. This will launch the frontend on your local machine, typically accessible at http://localhost:5173.


With both the backend and frontend servers running, you can interact with the CaliFashion application in your browser. The voice assistant will guide you through browsing products, adding items to your cart, and completing purchases. This setup ensures a smooth development experience for working with both components of the application.
