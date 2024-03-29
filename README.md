# Virtual Assistant BotChat

Creating a website-based botchat virtual assistant project that is used to answer simple questions. This project was created using the React + Vite framework on the front-end side with JavaScript language to create a responsive interface and fast data loading. Then, on the back-end side, an API was created using the Flask Framework to manage conversation data and using the DialoGPT NLP model from Microsoft to provide responses to questions asked by users. In terms of data persistence, the history of the conversation between the user and the chatbot will be stored using a local session mechanism so that the conversation history will remain as long as the session is still valid or not deleted. [Code reference](https://github.com/binary-hood/ChatBot)

## Installation and Usage

Clone this project repository to your local machine using Git.

### Prerequisites

Before getting started, make sure you have the following prerequisites installed:

- Node.js 16.16.0 or higher
- npm 8.11.0 or higher
- Python 3.11.2 or higher
- pip 22.3.1 or higher

### 1. Backend (Flask)

Navigate to directory backend

```
cd backend
```

Install requirements

```
pip install -r requirements.txt
```

run project

```
python app.py
```

### 2. Frontend (React + Vite)

Navigate to directory frontend

```
cd frontend
```

Install package

```
npm install
```

Run project

```
npm run dev
```

## Documentation

<img width="300" src="https://github.com/danalvr/chatbot-openAI/assets/81479217/2267fae2-b299-40c5-a450-d20ab97a389a" alt="doc1" />
<img width="600" src="https://github.com/danalvr/chatbot-openAI/assets/81479217/4c179913-d762-4c98-beaf-2b14f3253d7b" alt="doc2" />

## Demo
<img src="https://github.com/danalvr/chatbot-openAI/assets/81479217/e3658c0f-ef66-4dc7-8e81-b36472478090" alt="demo1" />
