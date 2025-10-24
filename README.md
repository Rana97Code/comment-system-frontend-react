# comment-system-frontend-react
Implementing a Comment System with MERN

# React Frontend App

A modern React frontend application that connects to a Node.js backend API.  

---

## Table of Contents
- [Project Setup](#project-setup)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Building for Production](#building-for-production)
- [Folder Structure](#folder-structure)


---

## Project Setup

1. Clone the repository:
```bash
git clone https://github.com/Rana97Code/comment-system-frontend-react.git
cd comment-system-frontend-react

2. Install dependencies:
npm install
npm start
npm run build

## Environment Variables .env

REACT_APP_API_URL=http://localhost:4000
REACT_APP_WS_URL=http://localhost:4000

## structure 
my-react-app/
├── public/
├── src/
│   ├── components/
│   ├── contexts/
│   ├── pages/
│   ├── App.js
│   └── index.js
├── .env
├── package.json
└── README.md



## After Run credentials 
    ##ALL Access
username: admin@email.com
password: admin1234

    ##Authorized Access | can add, delete, like, comment on own comment
username: rana.biswas.office@gmail.com	
password: 12345678

    ##User Access | Only like & comment on own comment
username: user@email.com
password: 12345678