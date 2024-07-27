# React + Vite
"Welcome to Wavelearn!
Empowering Education for Everyone
At Wavelearn, we believe that education is a fundamental right and a powerful tool for personal and societal transformation. Our mission is to make high-quality learning accessible to everyone, everywhere.

What We Offer
Diverse Courses: Explore a wide range of subjects and skills taught by expert instructors.
Interactive Learning: Engage with interactive content, quizzes, and assignments to reinforce your knowledge.
Flexible Scheduling: Learn at your own pace, anytime and anywhere, with our user-friendly platform.
Community Support: Join a vibrant community of learners and educators, and collaborate to achieve your goals.
Our Vision
"Education is the most powerful weapon which you can use to change the world." – Nelson Mandela

We are committed to providing an inclusive and supportive learning environment that empowers individuals to reach their full potential and contribute positively to their communities."

POSTMAN API's Link:- https://documenter.getpostman.com/view/24441701/2s93kz6REm

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


  "start": "react-scripts start",
    "build": "react-scripts build",
    "eject": "react-scripts eject",
    "server": "cd server && npm run dev",
    "dev": "concurrently -n \"client,server\" -c \"bgBlue,bgYellow\" \"npm start\" \"npm run server\""